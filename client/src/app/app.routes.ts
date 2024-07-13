import { Routes } from "@angular/router";
import { authGuard } from "./_guards/auth.guard";
import { preventUnsavedChangesGuard } from "./_guards/prevent-unsaved-changes.guard";
import { NotFoundComponent } from "./errors/not-found/not-found.component";
import { ServerErrorComponent } from "./errors/server-error/server-error.component";
import { TestErrorComponent } from "./errors/test-error/test-error.component";
import { HomeComponent } from "./home/home.component";
import { ListsComponent } from "./lists/lists.component";
import { MemberDetailComponent } from "./members/member-detail/member-detail.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { MembersEditComponent } from "./members/members-edit/members-edit.component";
import { MessagesComponent } from "./messages/messages.component";

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: '',
      runGuardsAndResolvers: 'always',
      canActivate: [authGuard],
      children: [
        {path: 'members', component: MemberListComponent},
        {path: 'members/:username', component: MemberDetailComponent},
        {path: 'member/:edit', component: MembersEditComponent, canDeactivate: [preventUnsavedChangesGuard]},
        {path: 'lists', component: ListsComponent},
        {path: 'messages', component: MessagesComponent},
      ]
    },
    {path: 'errors', component: TestErrorComponent},
    {path: 'not-found', component: NotFoundComponent},
    {path: 'server-error', component: ServerErrorComponent},
    {path: '**', component: NotFoundComponent, pathMatch: 'full'},
  ];