import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../core/services/api.service';

interface Activity {
  title: string;
  icon: string;
  color: string;
  timestamp: Date;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    MatCardModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private api = inject(ApiService);

  // Statistics
  totalGroups = 0;
  totalCultivations = 0;
  totalVarieties = 0;
  totalHarmfulCauses = 0;

  // Recent Activities
  recentActivities: Activity[] = [];

  ngOnInit() {
    this.loadStatistics();
    this.loadRecentActivities();
  }

  private loadStatistics() {
    // Load groups count
    this.api.getGroups().subscribe({
      next: (groups) => {
        this.totalGroups = groups.length;
      },
      error: (error) => {
        console.error('Error loading groups:', error);
      }
    });

    // For now, set placeholder values for other statistics
    // These would be loaded from respective API endpoints
    this.totalCultivations = 24;
    this.totalVarieties = 18;
    this.totalHarmfulCauses = 7;
  }

  private loadRecentActivities() {
    // Placeholder recent activities - in real app, these would come from an API
    this.recentActivities = [
      {
        title: 'Δημιουργήθηκε νέα ομάδα καλλιεργειών: "Δημητριακά"',
        icon: 'eco',
        color: 'primary',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
      },
      {
        title: 'Ενημερώθηκαν πληροφορίες για την ποικιλία "Triticum aestivum"',
        icon: 'local_florist',
        color: 'accent',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
      },
      {
        title: 'Προστέθηκε νέο ζημιογόνο αίτιο: "Σκουλήκι"',
        icon: 'bug_report',
        color: 'warn',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
      },
      {
        title: 'Καταχωρήθηκε νέα καλλιέργεια στην περιοχή Α1',
        icon: 'agriculture',
        color: 'primary',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      }
    ];
  }
}