import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IMeaning } from './models/meaning';
import { DictionaryService } from './services/dictionary.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  themeName: string = 'light-theme';
  searchForm: FormGroup;
  wordMeaning: IMeaning;
  @ViewChild('audioOption') audioPlayerRef: ElementRef;

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, private dictionaryService: DictionaryService) {}

  get wordAudio(): string {
    const audioObj = this.wordMeaning.phonetics.find(p => p.audio);
    return audioObj?.audio ? audioObj?.audio : '';
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      inputString: new FormControl('', [Validators.required])
    });
    this.renderer.addClass(this.document.body, this.themeName);
  }

  toggleDarkTheme() {
    this.document.body.classList.replace(this.themeName, this.themeName === 'light-theme' ? (this.themeName = 'dark-theme') : (this.themeName = 'light-theme'));
  }

  fetchMeaning() {
    if (this.searchForm.invalid) {
      return;
    }
    const word = this.searchForm.get('inputString')?.value;
    this.dictionaryService.getMeaning(word).subscribe({
      next: (resp: any) => this.wordMeaning = resp[0],
      error: (err) => console.log(err)
    });
  }

  onAudioPlay(){
    this.audioPlayerRef.nativeElement.play();
  }

  getSynonyms(list: string[]) {
    return list.slice(0, 5);
  }
}
