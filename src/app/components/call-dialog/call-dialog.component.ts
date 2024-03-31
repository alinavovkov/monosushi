import { Component } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-call-dialog',
  templateUrl: './call-dialog.component.html',
  styleUrl: './call-dialog.component.scss'
})
export class CallDialogComponent {
  public callForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CallDialogComponent>
  ) { }

  ngOnInit(): void {
    this.initCallForm();

  }
  initCallForm(): void {
    this.callForm = this.fb.group({
      name: [null, [Validators.required, Validators.email]],
      number: [null, [Validators.required]]
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
