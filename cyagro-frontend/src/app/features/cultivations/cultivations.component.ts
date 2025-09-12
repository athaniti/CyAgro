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
  selector: 'app-cultivations',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule
  ],
  templateUrl: './cultivations.component.html'
})
export class CultivationsComponent implements OnInit {
  private api = inject(ApiService);
  private fb = inject(FormBuilder);

  cultivations: any[] = [];
  displayed = ['id','name','code','actions'];

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
    const v = this.form.value;
    if (v.id) {
      this.api.updateCultivation(v.id as number, v).subscribe(() => { this.form.reset(); this.load(); });
    } else {
      this.api.createCultivation(v).subscribe(() => { this.form.reset(); this.load(); });
    }
  }

  edit(row: any){ this.form.patchValue(row); }
  clear(){ this.form.reset(); }
  delete(id: number){ this.api.deleteCultivation(id).subscribe(() => this.load()); }
}
