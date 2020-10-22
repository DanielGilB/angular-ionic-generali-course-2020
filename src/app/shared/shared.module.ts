import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

const IMPORTED_EXPORTS = [CommonModule, ReactiveFormsModule, IonicModule, TranslateModule];

const DECLARATIONS_EXPORTS = [];

@NgModule({
  declarations: [...DECLARATIONS_EXPORTS],
  imports: [...IMPORTED_EXPORTS],
  exports: [...IMPORTED_EXPORTS, ...DECLARATIONS_EXPORTS]
})
export class SharedModule {}
