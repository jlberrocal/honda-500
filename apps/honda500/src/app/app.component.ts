import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconRegistry } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'honda500';

  constructor(registry: MatIconRegistry, sanitizer: DomSanitizer) {
    registry
      .addSvgIcon(
        'whatsapp',
        sanitizer.bypassSecurityTrustResourceUrl('whatsapp.svg')
      )
      .addSvgIcon(
        'guanacaste',
        sanitizer.bypassSecurityTrustResourceUrl('guanacaste.svg')
      );
  }
}
