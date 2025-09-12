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
  selector: 'app-cultivation-groups',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule
  ],
  templateUrl: './cultivation-groups.component.html'
})
export class CultivationGroupsComponent implements OnInit {
  private api = inject(ApiService);
  private fb = inject(FormBuilder);

  groups: any[] = [];
  displayed = ['id','name','code','actions'];

  form = this.fb.group({
    id: [null],
    name: ['', Validators.required],
    code: ['', Validators.required],
    accounting_code: [''],
    koap_code: ['']
  });

  ngOnInit(){ this.load(); }

  load(){
    this.api.getGroups().subscribe(d => this.groups = d);
  }

  submit(){
    const v = this.form.value;
    if (v.id) {
      this.api.updateGroup(v.id as number, v).subscribe(() => { this.form.reset(); this.load(); });
    } else {
      this.api.createGroup(v).subscribe(() => { this.form.reset(); this.load(); });
    }
  }

  edit(row: any){ this.form.patchValue(row); }
  clear(){ this.form.reset(); }

  delete(id: number){
    this.api.deleteGroup(id).subscribe(() => this.load());
  }
}
