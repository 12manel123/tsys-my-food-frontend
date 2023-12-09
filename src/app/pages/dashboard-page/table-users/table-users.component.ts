import { Component } from '@angular/core';
import { User, UserDbService } from '../../../services/user-db.service';

@Component({
  selector: 'app-table-users',
  standalone: true,
  imports: [],
  templateUrl: './table-users.component.html',
  styleUrl: './table-users.component.css'
})
export class TableUsersComponent {
  users: User[] = [];
  showRoleModal = false;
  selectedUser: User | undefined;
  selectedUserId: number | undefined;
  newRole = '';
  constructor(private userDbService: UserDbService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userDbService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  deleteUser(userId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario con ID: '+ userId+"?")) {
      this.userDbService.deleteUser(userId).subscribe(() => {
        this.loadUsers();
      });
    }
  }

  closeRoleModal(): void {
    this.showRoleModal = false;
    this.selectedUser = undefined;
    this.newRole = '';
  }

  updateRole(userId: number): void {
    this.selectedUserId = userId;
    this.userDbService.updateRole(userId).subscribe(() => {
      this.loadUsers();
    });
  }
}
