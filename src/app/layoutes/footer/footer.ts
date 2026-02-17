import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface FooterLink {
  label: string;
  route?: string;
  external?: boolean;
  url?: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  sections: FooterSection[] = [
    {
      title: 'Produit',
      links: [
        { label: 'Offres d\'emploi', route: '/jobs' },
        { label: 'Entreprises', route: '/companies' },
        { label: 'Salaires', route: '/salaries' },
        { label: 'Blog', route: '/blog' }
      ]
    },
    {
      title: 'Entreprise',
      links: [
        { label: 'À propos', route: '/about' },
        { label: 'Carrières', route: '/careers' },
        { label: 'Contact', route: '/contact' },
        { label: 'Presse', route: '/press' }
      ]
    },
    {
      title: 'Légal',
      links: [
        { label: 'Conditions d\'utilisation', route: '/terms' },
        { label: 'Politique de confidentialité', route: '/privacy' },
        { label: 'Cookies', route: '/cookies' },
        { label: 'Mentions légales', route: '/legal' }
      ]
    }
  ];

  socialLinks = [
    { icon: 'linkedin', url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: 'twitter', url: 'https://twitter.com', label: 'Twitter' },
    { icon: 'facebook', url: 'https://facebook.com', label: 'Facebook' },
    { icon: 'instagram', url: 'https://instagram.com', label: 'Instagram' }
  ];
}
