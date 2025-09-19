import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-cultivations',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule
  ],
  templateUrl: './cultivations.component.html'
})
export class CultivationsComponent implements OnInit {
  private api = inject(ApiService);
  private fb = inject(FormBuilder);

  cultivations: any[] = [];
  displayed = ['id','name','code','actions'];
  showForm = false;
  isLoading = false;

  form = this.fb.group({
    id: [null],
    group_id: [null, Validators.required],
    name: ['', Validators.required],
    code: ['', Validators.required],
    type: ['annual'],
    coverage: ['basic']
  });

  ngOnInit(){ this.load(); }

  load(){ this.api.getCultivations().subscribe(d => this.cultivations = d); }

  submit(){
    if (this.form.invalid) return;
    
    this.isLoading = true;
    const v = this.form.value;
    
    if (v.id) {
      this.api.updateCultivation(v.id as number, v).subscribe({
        next: () => { 
          this.form.reset(); 
          this.load(); 
          this.showForm = false;
          this.isLoading = false;
        },
        error: () => this.isLoading = false
      });
    } else {
      this.api.createCultivation(v).subscribe({
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
  delete(id: number){ this.api.deleteCultivation(id).subscribe(() => this.load()); }
}
