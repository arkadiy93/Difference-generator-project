# Gendiff - educational project

Command-line utility for generating differences between two configurational files.

Supporting file formats:

* json
* yaml
* ini

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install.

```bash
npm install -g gendiff-hexlet
```


## Usage

```bash
gendiff [options] <firstConfig> <secondConfig>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  Output format
  -h, --help           output usage information
```

## Example

before.json:
```
{
  "common": {
    "setting1": "Value 1",
    "setting2": "200",
    "setting3": true,
    "setting6": {
      "key": "value"
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  }
}
```

after.json: 
```
{
  "common": {
    "follow": false,
    "setting1": "Value 1",
    "setting3": {
      "key": "value"
    },
    "setting4": "blah blah",
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops"
    }
  },

  "group1": {
    "foo": "bar",
    "baz": "bars",
    "nest": "str"
  }
}
```

```
$ gendiff before.json after.json
{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
        setting6: {
            key: value
          + ops: vops
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
}

```

## Output formats 

* git style (default)
```bash
{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}
```
* json
```bash
[
  {
    "name": "host",
    "type": "unchanged",
    "newValue": "hexlet.io"
  },
  {
    "name": "timeout",
    "type": "updated",
    "oldValue": 50,
    "newValue": 20
  },
  {
    "name": "proxy",
    "type": "removed",
    "newValue": "123.234.53.22"
  },
  {
    "name": "verbose",
    "type": "added",
    "newValue": true
  }
]
```
* logfile record
```bash
Property 'common.setting2' was removed
Property 'common.setting6' was removed
Property 'common.setting4' was added with value: blah blah
Property 'common.setting5' was added with complex value
```
