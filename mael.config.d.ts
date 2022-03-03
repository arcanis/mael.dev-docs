declare const config: {
  name: string;
  repository: string;
  description: string;
  algolia: string;

  icon: {
    letter: string;
  };

  colors: {
    primary: string;
  };

  sidebar: Record<string, Array<string>>;

  index: {
    overview: string;
    getStarted: string;
    features: Array<{
      title: string;
      description: string;
    }>;
  };
};

export = config;
