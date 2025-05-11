import { Component } from '@angular/core';
import { EmployeeService ,PresenceDto} from 'src/app/AALA/service/employee.service';



@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.css']
})
export class PresenceComponent {
  selectedDate: string = '';
  presences: PresenceDto[] = [];
  error: string = '';
  currentPage: number = 1;  // Page actuelle
  presencesPerPage: number = 2;  // Nombre de présences par page
  totalPresences: number = 0;
  constructor(private presenceService: EmployeeService) {}

  fetchPresences() {
    if (this.selectedDate) {
      this.presenceService.getPresencesByDate(this.selectedDate).subscribe({
        next: (data) => {
          this.presences = data;
          this.error = '';
        },
        error: (err) => {
          this.error = 'Erreur lors de la récupération des présences.';
          this.presences = [];
        }
      });
    }
  }
  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.fetchPresences();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchPresences();
    }
  }

  totalPages(): number {
    return Math.ceil(this.totalPresences / this.presencesPerPage);
  }
}
