export interface Country {
	name: Name;
	cca2: string;
	cca3: string;
	flags: {
		png: string;
	};
	altSpellings: string[];
	idd: {
		root: string;
	};
	
	//other informations
	capital?:     string[];
	languages?:   { [key: string]: string };
	population:   number;
	region:       string;
    subregion?:   string;
}

export interface Name {
    common:      string;
    official:    string;
    nativeName?: NativeName;
}

export interface NativeName {
	[key: string]: {
		official?: string;
	};
}