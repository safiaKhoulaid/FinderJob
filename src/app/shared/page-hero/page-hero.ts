import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-page-hero',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <section class="bg-gradient-to-r from-pink-50 to-blue-50 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {{ title() }}
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          {{ subtitle() }}
        </p>
      </div>
    </section>
  `,
})
export class PageHeroComponent {
    title = input.required<string>();
    subtitle = input.required<string>();
}
