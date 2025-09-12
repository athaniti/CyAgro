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

  form = this.fb.group({
    id: [null],
    cultivation_id: [null, Validators.required],
    name: ['', Validators.required],
    unit: ['area']
  });

  ngOnInit(){ this.load(); }

  load(){ this.api.getVarieties().subscribe(d => this.varieties = d); }

  submit(){
    const v = this.form.value;
    if (v.id) {
      this.api.updateVariety(v.id as number, v).subscribe(() => { this.form.reset(); this.load(); });
    } else {
      this.api.createVariety(v).subscribe(() => { this.form.reset(); this.load(); });
    }
  }

  edit(row: any){ this.form.patchValue(row); }
  clear(){ this.form.reset(); }
  delete(id: number){ this.api.deleteVariety(id).subscribe(() => this.load()); }
}
