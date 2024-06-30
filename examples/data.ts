const US_STATES_PLAIN = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming'
];

const US_STATES = [
  {
    name: 'Alabama',
    abbr: 'AL'
  },
  {
    name: 'Alaska',
    abbr: 'AK'
  },
  {
    name: 'American Samoa',
    abbr: 'AS'
  },
  {
    name: 'Arizona',
    abbr: 'AZ'
  },
  {
    name: 'Arkansas',
    abbr: 'AR'
  },
  {
    name: 'California',
    abbr: 'CA'
  },
  {
    name: 'Colorado',
    abbr: 'CO'
  },
  {
    name: 'Connecticut',
    abbr: 'CT'
  },
  {
    name: 'Delaware',
    abbr: 'DE'
  },
  {
    name: 'District Of Columbia',
    abbr: 'DC'
  },
  {
    name: 'Micronesia',
    abbr: 'FM'
  },
  {
    name: 'Florida',
    abbr: 'FL'
  },
  {
    name: 'Georgia',
    abbr: 'GA'
  },
  {
    name: 'Guam',
    abbr: 'GU'
  },
  {
    name: 'Hawaii',
    abbr: 'HI'
  },
  {
    name: 'Idaho',
    abbr: 'ID'
  },
  {
    name: 'Illinois',
    abbr: 'IL'
  },
  {
    name: 'Indiana',
    abbr: 'IN'
  },
  {
    name: 'Iowa',
    abbr: 'IA'
  },
  {
    name: 'Kansas',
    abbr: 'KS'
  },
  {
    name: 'Kentucky',
    abbr: 'KY'
  },
  {
    name: 'Louisiana',
    abbr: 'LA'
  },
  {
    name: 'Maine',
    abbr: 'ME'
  },
  {
    name: 'Marshall Islands',
    abbr: 'MH'
  },
  {
    name: 'Maryland',
    abbr: 'MD'
  },
  {
    name: 'Massachusetts',
    abbr: 'MA'
  },
  {
    name: 'Michigan',
    abbr: 'MI'
  },
  {
    name: 'Minnesota',
    abbr: 'MN'
  },
  {
    name: 'Mississippi',
    abbr: 'MS'
  },
  {
    name: 'Missouri',
    abbr: 'MO'
  },
  {
    name: 'Montana',
    abbr: 'MT'
  },
  {
    name: 'Nebraska',
    abbr: 'NE'
  },
  {
    name: 'Nevada',
    abbr: 'NV'
  },
  {
    name: 'New Hampshire',
    abbr: 'NH'
  },
  {
    name: 'New Jersey',
    abbr: 'NJ'
  },
  {
    name: 'New Mexico',
    abbr: 'NM'
  },
  {
    name: 'New York',
    abbr: 'NY'
  },
  {
    name: 'North Carolina',
    abbr: 'NC'
  },
  {
    name: 'North Dakota',
    abbr: 'ND'
  },
  {
    name: 'Northern Mariana Islands',
    abbr: 'MP'
  },
  {
    name: 'Ohio',
    abbr: 'OH'
  },
  {
    name: 'Oklahoma',
    abbr: 'OK'
  },
  {
    name: 'Oregon',
    abbr: 'OR'
  },
  {
    name: 'Palau',
    abbr: 'PW'
  },
  {
    name: 'Pennsylvania',
    abbr: 'PA'
  },
  {
    name: 'Puerto Rico',
    abbr: 'PR'
  },
  {
    name: 'Rhode Island',
    abbr: 'RI'
  },
  {
    name: 'South Carolina',
    abbr: 'SC'
  },
  {
    name: 'South Dakota',
    abbr: 'SD'
  },
  {
    name: 'Tennessee',
    abbr: 'TN'
  },
  {
    name: 'Texas',
    abbr: 'TX'
  },
  {
    name: 'Utah',
    abbr: 'UT'
  },
  {
    name: 'Vermont',
    abbr: 'VT'
  },
  {
    name: 'Virgin Islands',
    abbr: 'VI'
  },
  {
    name: 'Virginia',
    abbr: 'VA'
  },
  {
    name: 'Washington',
    abbr: 'WA'
  },
  {
    name: 'West Virginia',
    abbr: 'WV'
  },
  {
    name: 'Wisconsin',
    abbr: 'WI'
  },
  {
    name: 'Wyoming',
    abbr: 'WY'
  }
];

const KEYED_GROUP = {
  A: [
    {
      name: 'Alabama',
      abbr: 'AL'
    },
    {
      name: 'Alaska',
      abbr: 'AK'
    },
    {
      name: 'American Samoa',
      abbr: 'AS'
    },
    {
      name: 'Arizona',
      abbr: 'AZ'
    },
    {
      name: 'Arkansas',
      abbr: 'AR'
    }
  ],
  C: [
    {
      name: 'California',
      abbr: 'CA'
    },
    {
      name: 'Colorado',
      abbr: 'CO'
    },
    {
      name: 'Connecticut',
      abbr: 'CT'
    }
  ],
  D: [
    {
      name: 'Delaware',
      abbr: 'DE'
    },
    {
      name: 'District Of Columbia',
      abbr: 'DC'
    }
  ],
  F: [
    {
      name: 'Micronesia',
      abbr: 'FM'
    },
    {
      name: 'Florida',
      abbr: 'FL'
    }
  ],
  G: [
    {
      name: 'Georgia',
      abbr: 'GA'
    },
    {
      name: 'Guam',
      abbr: 'GU'
    }
  ],
  H: [
    {
      name: 'Hawaii',
      abbr: 'HI'
    }
  ],
  I: [
    {
      name: 'Idaho',
      abbr: 'ID'
    },
    {
      name: 'Illinois',
      abbr: 'IL'
    },
    {
      name: 'Indiana',
      abbr: 'IN'
    },
    {
      name: 'Iowa',
      abbr: 'IA'
    }
  ],
  K: [
    {
      name: 'Kansas',
      abbr: 'KS'
    },
    {
      name: 'Kentucky',
      abbr: 'KY'
    }
  ],
  L: [
    {
      name: 'Louisiana',
      abbr: 'LA'
    }
  ],
  M: [
    {
      name: 'Maine',
      abbr: 'ME'
    },
    {
      name: 'Marshall Islands',
      abbr: 'MH'
    },
    {
      name: 'Maryland',
      abbr: 'MD'
    },
    {
      name: 'Massachusetts',
      abbr: 'MA'
    },
    {
      name: 'Michigan',
      abbr: 'MI'
    },
    {
      name: 'Minnesota',
      abbr: 'MN'
    },
    {
      name: 'Mississippi',
      abbr: 'MS'
    },
    {
      name: 'Missouri',
      abbr: 'MO'
    },
    {
      name: 'Montana',
      abbr: 'MT'
    },
    {
      name: 'Northern Mariana Islands',
      abbr: 'MP'
    }
  ],
  N: [
    {
      name: 'Nebraska',
      abbr: 'NE'
    },
    {
      name: 'Nevada',
      abbr: 'NV'
    },
    {
      name: 'New Hampshire',
      abbr: 'NH'
    },
    {
      name: 'New Jersey',
      abbr: 'NJ'
    },
    {
      name: 'New Mexico',
      abbr: 'NM'
    },
    {
      name: 'New York',
      abbr: 'NY'
    },
    {
      name: 'North Carolina',
      abbr: 'NC'
    },
    {
      name: 'North Dakota',
      abbr: 'ND'
    }
  ],
  O: [
    {
      name: 'Ohio',
      abbr: 'OH'
    },
    {
      name: 'Oklahoma',
      abbr: 'OK'
    },
    {
      name: 'Oregon',
      abbr: 'OR'
    }
  ],
  P: [
    {
      name: 'Palau',
      abbr: 'PW'
    },
    {
      name: 'Pennsylvania',
      abbr: 'PA'
    },
    {
      name: 'Puerto Rico',
      abbr: 'PR'
    }
  ],
  R: [
    {
      name: 'Rhode Island',
      abbr: 'RI'
    }
  ],
  S: [
    {
      name: 'South Carolina',
      abbr: 'SC'
    },
    {
      name: 'South Dakota',
      abbr: 'SD'
    }
  ],
  T: [
    {
      name: 'Tennessee',
      abbr: 'TN'
    },
    {
      name: 'Texas',
      abbr: 'TX'
    }
  ],
  U: [
    {
      name: 'Utah',
      abbr: 'UT'
    }
  ],
  V: [
    {
      name: 'Vermont',
      abbr: 'VT'
    },
    {
      name: 'Virgin Islands',
      abbr: 'VI'
    },
    {
      name: 'Virginia',
      abbr: 'VA'
    }
  ],
  W: [
    {
      name: 'Washington',
      abbr: 'WA'
    },
    {
      name: 'West Virginia',
      abbr: 'WV'
    },
    {
      name: 'Wisconsin',
      abbr: 'WI'
    },
    {
      name: 'Wyoming',
      abbr: 'WY'
    }
  ]
};

const LIST_GROUP = [
  {
    groupKey: 'A',
    states: [
      {
        name: 'Alabama',
        abbr: 'AL'
      },
      {
        name: 'Alaska',
        abbr: 'AK'
      },
      {
        name: 'a',
        abbr: 'A'
      },
      {
        name: 'American Samoa',
        abbr: 'AS'
      },
      {
        name: 'Arizona',
        abbr: 'AZ'
      },
      {
        name: 'Arkansas',
        abbr: 'AR'
      }
    ]
  },
  {
    groupKey: 'C',
    states: [
      {
        name: 'California',
        abbr: 'CA'
      },
      {
        name: 'Colorado',
        abbr: 'CO'
      },
      {
        name: 'Connecticut',
        abbr: 'CT'
      }
    ]
  },
  {
    groupKey: 'D',
    states: [
      {
        name: 'Delaware',
        abbr: 'DE'
      },
      {
        name: 'District Of Columbia',
        abbr: 'DC'
      }
    ]
  },
  {
    groupKey: 'F',
    states: [
      {
        name: 'Micronesia',
        abbr: 'FM'
      },
      {
        name: 'Florida',
        abbr: 'FL'
      }
    ]
  },
  {
    groupKey: 'G',
    states: [
      {
        name: 'Georgia',
        abbr: 'GA'
      },
      {
        name: 'Guam',
        abbr: 'GU'
      }
    ]
  },
  {
    groupKey: 'H',
    states: [
      {
        name: 'Hawaii',
        abbr: 'HI'
      }
    ]
  },
  {
    groupKey: 'I',
    states: [
      {
        name: 'Idaho',
        abbr: 'ID'
      },
      {
        name: 'Illinois',
        abbr: 'IL'
      },
      {
        name: 'Indiana',
        abbr: 'IN'
      },
      {
        name: 'Iowa',
        abbr: 'IA'
      }
    ]
  },
  {
    groupKey: 'K',
    states: [
      {
        name: 'Kansas',
        abbr: 'KS'
      },
      {
        name: 'Kentucky',
        abbr: 'KY'
      }
    ]
  },
  {
    groupKey: 'L',
    states: [
      {
        name: 'Louisiana',
        abbr: 'LA'
      }
    ]
  },
  {
    groupKey: 'M',
    states: [
      {
        name: 'Maine',
        abbr: 'ME'
      },
      {
        name: 'Marshall Islands',
        abbr: 'MH'
      },
      {
        name: 'Maryland',
        abbr: 'MD'
      },
      {
        name: 'Massachusetts',
        abbr: 'MA'
      },
      {
        name: 'Michigan',
        abbr: 'MI'
      },
      {
        name: 'Minnesota',
        abbr: 'MN'
      },
      {
        name: 'Mississippi',
        abbr: 'MS'
      },
      {
        name: 'Missouri',
        abbr: 'MO'
      },
      {
        name: 'Montana',
        abbr: 'MT'
      },
      {
        name: 'Northern Mariana Islands',
        abbr: 'MP'
      }
    ]
  },
  {
    groupKey: 'N',
    states: [
      {
        name: 'Nebraska',
        abbr: 'NE'
      },
      {
        name: 'Nevada',
        abbr: 'NV'
      },
      {
        name: 'New Hampshire',
        abbr: 'NH'
      },
      {
        name: 'New Jersey',
        abbr: 'NJ'
      },
      {
        name: 'New Mexico',
        abbr: 'NM'
      },
      {
        name: 'New York',
        abbr: 'NY'
      },
      {
        name: 'North Carolina',
        abbr: 'NC'
      },
      {
        name: 'North Dakota',
        abbr: 'ND'
      }
    ]
  },
  {
    groupKey: 'O',
    states: [
      {
        name: 'Ohio',
        abbr: 'OH'
      },
      {
        name: 'Oklahoma',
        abbr: 'OK'
      },
      {
        name: 'Oregon',
        abbr: 'OR'
      }
    ]
  },
  {
    groupKey: 'P',
    states: [
      {
        name: 'Palau',
        abbr: 'PW'
      },
      {
        name: 'Pennsylvania',
        abbr: 'PA'
      },
      {
        name: 'Puerto Rico',
        abbr: 'PR'
      }
    ]
  },
  {
    groupKey: 'R',
    states: [
      {
        name: 'Rhode Island',
        abbr: 'RI'
      }
    ]
  },
  {
    groupKey: 'S',
    states: [
      {
        name: 'South Carolina',
        abbr: 'SC'
      },
      {
        name: 'South Dakota',
        abbr: 'SD'
      }
    ]
  },
  {
    groupKey: 'T',
    states: [
      {
        name: 'Tennessee',
        abbr: 'TN'
      },
      {
        name: 'Texas',
        abbr: 'TX'
      }
    ]
  },
  {
    groupKey: 'U',
    states: [
      {
        name: 'Utah',
        abbr: 'UT'
      }
    ]
  },
  {
    groupKey: 'V',
    states: [
      {
        name: 'Vermont',
        abbr: 'VT'
      },
      {
        name: 'Virgin Islands',
        abbr: 'VI'
      },
      {
        name: 'Virginia',
        abbr: 'VA'
      }
    ]
  },
  {
    groupKey: 'W',
    states: [
      {
        name: 'Washington',
        abbr: 'WA'
      },
      {
        name: 'West Virginia',
        abbr: 'WV'
      },
      {
        name: 'Wisconsin',
        abbr: 'WI'
      },
      {
        name: 'Wyoming',
        abbr: 'WY'
      }
    ]
  }
];

const KEYED_GROUP_PLAIN = {
  A: ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas'],
  C: ['California', 'Colorado', 'Connecticut'],
  D: ['Delaware', 'District Of Columbia'],
  F: ['Micronesia', 'Florida'],
  G: ['Georgia', 'Guam'],
  H: ['Hawaii'],
  I: ['Idaho', 'Illinois', 'Indiana', 'Iowa'],
  K: ['Kansas', 'Kentucky'],
  L: ['Louisiana'],
  M: [
    'Maine',
    'Marshall Islands',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Northern Mariana Islands'
  ],
  N: [
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota'
  ],
  O: ['Ohio', 'Oklahoma', 'Oregon'],
  P: ['Palau', 'Pennsylvania', 'Puerto Rico'],
  R: ['Rhode Island'],
  S: ['South Carolina', 'South Dakota'],
  T: ['Tennessee', 'Texas'],
  U: ['Utah'],
  V: ['Vermont', 'Virgin Islands', 'Virginia'],
  W: ['Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
};

const LIST_GROUP_PLAIN = [
  {
    groupKey: 'A',
    states: ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas']
  },
  {
    groupKey: 'C',
    states: ['California', 'Colorado', 'Connecticut']
  },
  {
    groupKey: 'D',
    states: ['Delaware', 'District Of Columbia']
  },
  {
    groupKey: 'F',
    states: ['Micronesia', 'Florida']
  },
  {
    groupKey: 'G',
    states: ['Georgia', 'Guam']
  },
  {
    groupKey: 'H',
    states: ['Hawaii']
  },
  {
    groupKey: 'I',
    states: ['Idaho', 'Illinois', 'Indiana', 'Iowa']
  },
  {
    groupKey: 'K',
    states: ['Kansas', 'Kentucky']
  },
  {
    groupKey: 'L',
    states: ['Louisiana']
  },
  {
    groupKey: 'M',
    states: [
      'Maine',
      'Marshall Islands',
      'Maryland',
      'Massachusetts',
      'Michigan',
      'Minnesota',
      'Mississippi',
      'Missouri',
      'Montana',
      'Northern Mariana Islands'
    ]
  },
  {
    groupKey: 'N',
    states: [
      'Nebraska',
      'Nevada',
      'New Hampshire',
      'New Jersey',
      'New Mexico',
      'New York',
      'North Carolina',
      'North Dakota'
    ]
  },
  {
    groupKey: 'O',
    states: ['Ohio', 'Oklahoma', 'Oregon']
  },
  {
    groupKey: 'P',
    states: ['Palau', 'Pennsylvania', 'Puerto Rico']
  },
  {
    groupKey: 'R',
    states: ['Rhode Island']
  },
  {
    groupKey: 'S',
    states: ['South Carolina', 'South Dakota']
  },
  {
    groupKey: 'T',
    states: ['Tennessee', 'Texas']
  },
  {
    groupKey: 'U',
    states: ['Utah']
  },
  {
    groupKey: 'V',
    states: ['Vermont', 'Virgin Islands', 'Virginia']
  },
  {
    groupKey: 'W',
    states: ['Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
  }
];

export {
  US_STATES,
  US_STATES_PLAIN,
  KEYED_GROUP,
  LIST_GROUP,
  KEYED_GROUP_PLAIN,
  LIST_GROUP_PLAIN
};
