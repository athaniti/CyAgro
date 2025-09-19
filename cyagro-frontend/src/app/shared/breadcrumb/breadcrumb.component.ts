import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

export interface BreadcrumbItem {
  label: string;
  link?: string;
  icon?: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  template: `
    <nav class="breadcrumb-nav" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a routerLink="/dashboard" class="breadcrumb-link">
            <mat-icon>home</mat-icon>
            <span>Αρχική</span>
          </a>
        </li>
        <li *ngFor="let item of items; let last = last" 
            class="breadcrumb-item" 
            [class.active]="last">
          <mat-icon class="separator">chevron_right</mat-icon>
          <a *ngIf="item.link && !last" 
             [routerLink]="item.link" 
             class="breadcrumb-link">
            <mat-icon *ngIf="item.icon">{{ item.icon }}</mat-icon>
            <span>{{ item.label }}</span>
          </a>
          <span *ngIf="!item.link || last" class="breadcrumb-current">
            <mat-icon *ngIf="item.icon">{{ item.icon }}</mat-icon>
            <span>{{ item.label }}</span>
          </span>
        </li>
      </ol>
    </nav>
  `,
  styles: [`
    .breadcrumb-nav {
      padding: var(--spacing-md) 0;
      border-bottom: 1px solid var(--border-color);
      margin-bottom: var(--spacing-lg);
    }

    .breadcrumb {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--spacing-xs);
    }

    .breadcrumb-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      
      &:first-child .separator {
        display: none;
      }
    }

    .separator {
      color: var(--text-muted);
      font-size: 1rem;
      width: 1rem;
      height: 1rem;
    }

    .breadcrumb-link {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      text-decoration: none;
      color: var(--primary-color);
      transition: color var(--transition-fast);
      padding: var(--spacing-xs) var(--spacing-sm);
      border-radius: var(--border-radius-sm);
      
      &:hover {
        color: var(--primary-dark);
        background: rgba(46, 125, 50, 0.05);
      }
      
      mat-icon {
        font-size: 1rem;
        width: 1rem;
        height: 1rem;
      }
      
      span {
        font-size: 0.875rem;
        font-weight: 500;
      }
    }

    .breadcrumb-current {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      color: var(--text-secondary);
      padding: var(--spacing-xs) var(--spacing-sm);
      
      mat-icon {
        font-size: 1rem;
        width: 1rem;
        height: 1rem;
      }
      
      span {
        font-size: 0.875rem;
        font-weight: 600;
      }
    }

    .breadcrumb-item.active .breadcrumb-current {
      color: var(--text-primary);
    }

    @media (max-width: 768px) {
      .breadcrumb {
        font-size: 0.8rem;
      }
      
      .breadcrumb-link span,
      .breadcrumb-current span {
        font-size: 0.8rem;
      }
    }
  `]
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
}