type ChangelogData = {
  releaseDate: Date;
  version: string;
  bannerImageUrl: string;
  contributors: string[];
  features?: string[];
  improvements?: string[];
  bugFixes?: string[];
};

class Changelog {
  releaseDate: Date;
  bannerImageUrl: string;
  version: string;
  contributors: string[];
  features: string[];
  improvements: string[];
  bugFixes: string[];
  constructor({
    releaseDate,
    bannerImageUrl,
    version,
    contributors,
    features = [],
    improvements = [],
    bugFixes = [],
  }: ChangelogData) {
    this.releaseDate = releaseDate;
    this.bannerImageUrl = bannerImageUrl;
    this.version = version;
    this.contributors = contributors;
    this.features = features;
    this.improvements = improvements;
    this.bugFixes = bugFixes;
  }
}

export default Changelog;
