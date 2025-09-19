import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-varieties',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule
  ],
  templateUrl: './varieties.component.html'
})
export class VarietiesComponent implements OnInit {
  private api = inject(ApiService);
  private fb = inject(FormBuilder);

  varieties: any[] = [];
  displayed = ['id','name','unit','actions'];
  showForm = false;
  isLoading = false;

  form = this.fb.group({
    id: [null],
    cultivation_id: [null, Validators.required],
    name: ['', Validators.required],
    unit: ['area']
  });

  ngOnInit(){ this.load(); }

  load(){ this.api.getVarieties().subscribe(d => this.varieties = d); }

  submit(){
    if (this.form.invalid) return;
    
    this.isLoading = true;
    const v = this.form.value;
    
    if (v.id) {
      this.api.updateVariety(v.id as number, v).subscribe({
        next: () => { 
          this.form.reset(); 
          this.load(); 
          this.showForm = false;
          this.isLoading = false;
        },
        error: () => this.isLoading = false
      });
    } else {
      this.api.createVariety(v).subscribe({
        next: () => { 
          this.form.reset(); 
          this.load(); 
          this.showForm = false;
          this.isLoading = false;
        },
        error: () => this.isLoading = false
      });
    }
  }

  edit(row: any){ 
    this.form.patchValue(row); 
    this.showForm = true;
  }
  clear(){ 
    this.form.reset(); 
    this.showForm = true;
  }
  hideForm() {
    this.showForm = false;
    this.form.reset();
  }
  delete(id: number){ this.api.deleteVariety(id).subscribe(() => this.load()); }
}
