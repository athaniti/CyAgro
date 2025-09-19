import { Component, OnInit, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-cultivation-groups',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatTableModule, MatButtonModule, MatFormFieldModule, 
    MatInputModule, MatIconModule, MatDialogModule, MatSnackBarModule
  ],
  templateUrl: './cultivation-groups.component.html',
  styleUrls: ['./cultivation-groups.component.scss']
})
export class CultivationGroupsComponent implements OnInit {
  private api = inject(ApiService);
  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns = ['id', 'name', 'code', 'accounting_code', 'koap_code', 'actions'];
  isLoading = false;
  errorMsg = '';
  successMsg = '';
  showForm = false;

  form = this.fb.group({
    id: [null],
    name: ['', [Validators.required, Validators.minLength(2)]],
    code: ['', [Validators.required, Validators.minLength(3)]],
    accounting_code: [''],
    koap_code: ['']
  });

  ngOnInit() { 
    this.load(); 
  }

  load() {
    this.isLoading = true;
    this.errorMsg = '';
    
    this.api.getGroups().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMsg = 'Σφάλμα κατά τη φόρτωση των δεδομένων';
        console.error('Error loading groups:', error);
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMsg = '';
    this.successMsg = '';
    
    const formValue = this.form.value;
    
    if (formValue.id) {
      // Update existing
      this.api.updateGroup(formValue.id as number, formValue).subscribe({
        next: () => {
          this.isLoading = false;
          this.successMsg = 'Η ομάδα ενημερώθηκε επιτυχώς!';
          this.showSnackBar('Η ομάδα ενημερώθηκε επιτυχώς!', 'success');
          this.form.reset();
          this.load();
          this.clearMessages();
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMsg = 'Σφάλμα κατά την ενημέρωση της ομάδας';
          console.error('Error updating group:', error);
        }
      });
    } else {
      // Create new
      this.api.createGroup(formValue).subscribe({
        next: () => {
          this.isLoading = false;
          this.successMsg = 'Η ομάδα δημιουργήθηκε επιτυχώς!';
          this.showSnackBar('Η ομάδα δημιουργήθηκε επιτυχώς!', 'success');
          this.form.reset();
          this.load();
          this.clearMessages();
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMsg = 'Σφάλμα κατά τη δημιουργία της ομάδας';
          console.error('Error creating group:', error);
        }
      });
    }
  }

  edit(row: any) { 
    this.form.patchValue(row);
    this.clearMessages();
    this.showForm = true;
    // Scroll to form
    document.querySelector('.form-container')?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }

  clear() { 
    this.form.reset();
    this.clearMessages();
    this.showForm = true;
  }

  hideForm() {
    this.showForm = false;
    this.form.reset();
    this.clearMessages();
  }

  confirmDelete(row: any) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, {
      width: '400px',
      data: { name: row.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(row.id);
      }
    });
  }

  delete(id: number) {
    this.isLoading = true;
    this.errorMsg = '';
    
    this.api.deleteGroup(id).subscribe({
      next: () => {
        this.isLoading = false;
        this.showSnackBar('Η ομάδα διαγράφηκε επιτυχώς!', 'success');
        this.load();
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMsg = 'Σφάλμα κατά τη διαγραφή της ομάδας';
        console.error('Error deleting group:', error);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private showSnackBar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Κλείσιμο', {
      duration: 3000,
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar'
    });
  }

  private clearMessages() {
    setTimeout(() => {
      this.errorMsg = '';
      this.successMsg = '';
    }, 3000);
  }
}

// Confirmation Dialog Component
@Component({
  selector: 'app-confirm-delete',
  template: `
    <h2 mat-dialog-title>Επιβεβαίωση Διαγραφής</h2>
    <mat-dialog-content>
      <p>Είστε σίγουροι ότι θέλετε να διαγράψετε την ομάδα "<strong>{{data.name}}</strong>";</p>
      <p>Αυτή η ενέργεια δεν μπορεί να αναιρεθεί.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Ακύρωση</button>
      <button mat-raised-button color="warn" (click)="onConfirm()">Διαγραφή</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule]
})
export class ConfirmDeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
