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
  selector: 'app-harmful-causes',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule
  ],
  templateUrl: './harmful-causes.component.html'
})
export class HarmfulCausesComponent implements OnInit {
  private api = inject(ApiService);
  private fb = inject(FormBuilder);

  harmfuls: any[] = [];
  displayed = ['id','name','actions'];

  form = this.fb.group({
    id: [null],
    name: ['', Validators.required]
  });

  ngOnInit(){ this.load(); }

  load(){ this.api.getHarmfulCauses().subscribe(d => this.harmfuls = d); }

  submit(){
    const v = this.form.value;
    if (v.id) {
      this.api.updateHarmfulCause(v.id as number, v).subscribe(() => { this.form.reset(); this.load(); });
    } else {
      this.api.createHarmfulCause(v).subscribe(() => { this.form.reset(); this.load(); });
    }
  }

  edit(row: any){ this.form.patchValue(row); }
  clear(){ this.form.reset(); }
  delete(id: number){ this.api.deleteHarmfulCause(id).subscribe(() => this.load()); }
}
