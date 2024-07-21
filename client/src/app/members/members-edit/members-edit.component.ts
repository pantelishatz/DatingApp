import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { PhotoEditorComponent } from '../photo-editor/photo-editor.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-members-edit',
    templateUrl: './members-edit.component.html',
    styleUrls: ['./members-edit.component.css'],
    standalone: true,
    imports: [NgIf, TabsModule, FormsModule, PhotoEditorComponent]
})
export class MembersEditComponent implements OnInit {
  private accountService = inject(AccountService);
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }
  member: Member | undefined;
  user = this.accountService.currentUser();

  constructor(private memberService: MembersService, private toastr: ToastrService) {}

  ngOnInit(): void {
      this.loadMember();
  }

  loadMember() {
    if (!this.user) return;
    this.memberService.getMember(this.user.username).subscribe({
      next: member => this.member = member
    })
  }

  updateMember() {
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: _ => {
        this.toastr.success('Profile updated successfully');
        this.editForm?.reset(this.member);
      }
    })
  }
}
