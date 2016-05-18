import { Injectable } from '@angular/core';

@Injectable()
export class ColorsService {
	public tinycolor = require('tinycolor2');
	// https://www.google.com/design/spec/style/color.html#color-themes 
	private darkTheme: Array<Color>;
	private lightTheme: Array<Color>;


	constructor() {
		this.lightTheme = [
            new Color('status-bar', '#E0E0E0'),
			new Color('app-bar', '#F5F5F5'),
			new Color('background', '#FAFAFA'),
			new Color('cards-dialogs', '#FFFFFF')
		];
		this.darkTheme = [
            new Color('status-bar', '#000000'),
			new Color('app-bar', '#212121'),
			new Color('background', '#303030'),
			new Color('cards-dialogs', '#424242')
		];
	}

	computeColors(hex: string) {
		return [
			this.getColorObject(this.tinycolor(hex).lighten(52), '50'),
			this.getColorObject(this.tinycolor(hex).lighten(37), '100'),
			this.getColorObject(this.tinycolor(hex).lighten(26), '200'),
			this.getColorObject(this.tinycolor(hex).lighten(12), '300'),
			this.getColorObject(this.tinycolor(hex).lighten(6), '400'),
			this.getColorObject(this.tinycolor(hex), '500'),
			this.getColorObject(this.tinycolor(hex).darken(6), '600'),
			this.getColorObject(this.tinycolor(hex).darken(12), '700'),
			this.getColorObject(this.tinycolor(hex).darken(18), '800'),
			this.getColorObject(this.tinycolor(hex).darken(24), '900'),
			this.getColorObject(this.tinycolor(hex).lighten(52), 'A100'),
			this.getColorObject(this.tinycolor(hex).lighten(37), 'A200'),
			this.getColorObject(this.tinycolor(hex).lighten(6), 'A400'),
			this.getColorObject(this.tinycolor(hex).darken(12), 'A700')
		];
	}

	getColorObject(value, name) {
		var c = this.tinycolor(value);
		return {
			name: name,
			hex: c.toHexString(),
			darkContrast: c.isLight()
		};
	}

	getBGColor(): string {
		return '#3a3c42';
	}

	getPrimaryColor(): string {
		return '#f29c01';
	}

	getDarkTheme(): Array<Color> {
		return this.darkTheme;
	}

}

export class Color {
    //full constructor       
    constructor(public name: string,
		public hex: string) { }
}