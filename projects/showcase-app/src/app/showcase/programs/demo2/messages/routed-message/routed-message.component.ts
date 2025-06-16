import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-dw-showcase-routed-message',
  templateUrl: './routed-message.component.html',
  styleUrls: ['./routed-message.component.css']
})
export class ShowcaseRoutedMessageComponent implements OnInit {

  validateForm: FormGroup;
  messages: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private DwMessage: NzMessageService) { }

  _submitForm(): void {
    this.router.navigate(['../dw-route-back-page'], { relativeTo: this.route });
    for (const message of this.messages) {
      this.DwMessage.success(message);
    }
  }

  addMessage(): void {
    this.messages.push(this.validateForm.controls.message.value);
    this.validateForm.controls.message.setValue('');
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      message: [null, [Validators.required]]
    });
  }

  getFormControl(name: string): any {
    return this.validateForm.controls[name];
  }

}
