# js_browser_fingerprint_attributes

Hi-hi!
There is implementation of some algorithms for obtaining information from a browser about a computer, network and browser itself.

This scripts were written for dreamhack 3 competition in about 24 hours, so this lost some of code best practice. (<a href="https://github.com/pymq/demhack3">check my demhack3 project</a>)

## Available attributes:

- Base browser attributes: CPU threads, renderer, browser vendor, and much more (provided by fingerprintjs)
- Desktop app (external protocol flooding vulnerability)
- Browser extensions (browser pluggin) detector
- Open ports
- Private mode (Incognito mode detection)
- Browser itself (Chrome, FireFox, Opera, etc.)

## Usage:

Every lib has this own func with promise, so if you need something specific, just call it

```
getFPJSLibDataPromise(); // Fingerprintjs data
let detectApp = newDetectApp();
detectApp.getUserApps(); // Desktop app detector
getExtensions(); // Browser extensions (browser pluggin)
getOpenPorts(); // Open ports
isPrivateMode(); // Private mode

getMetrics(); // And if you want them all

consolePrintGetMetrics();
consolePrintJSONGetMetrics();
```

## About attributes:

Below some information about the source of idea/code/both, that I used and adapted for my purpose, and some attributes description:

### fingerprintjs

I just use <a href="https://github.com/fingerprintjs/fingerprintjs">fingerprintjs lib</a>, for obtain base browser attributes. It's work, it's fine.
It provides a lot of attributes, unfortunately some of them works only in some browsers, chrome for example. 
 
 ### Desktop app detector (external protocol flooding vulnerability)
 
 <a href="https://fingerprintjs.com/blog/external-protocol-flooding/">Idea</a> and <a href="https://schemeflood.com/">idea live demo</a> and <a href="https://github.com/fingerprintjs/external-protocol-flooding">idea live demo source code</a>. 
 
So the main idea found the application from defined pull. As you know browser could suggest to you open app, if it is installed on your device. For this purpose special links (deep links), like "skype://", are used. And from js we could know, when this "suggest window" open. Easy! 

So, this realization just a kind of copy-paste from TypeScript realization of live demo, I adopt it for js and delete some React bindings... And it works.

### Browser extensions (browser pluggin) detector

Simple and powerfull) 

All that you need to know, you could do js fetch for extensions pages of this are public.

My realization use defined pull of extensions id's and public pages (you should parse it from store) to detect if it is installed in browser. 

Chrome browser url for fetch is:
``
 chrome-extension://EXTENSION_ID/EXTENSION_STATIC_FILE
``

#### How to get necessary data for browser extension detection

1. Parse it from store page
2. Load .crx archive with extension (I used <a href="https://crxextractor.com/">crxextractor</a>)
3. Open archive and find manifest.json (it's not zip, so use the special arhivator), looking for static files in "web_accessible_resources"

### Ports detector

The idea is simple, try to get something from closed port and from open port, fetching info from open port is little bit slower. But it's only idea) It not work with chrome and windows (But works with linux and firefox)

<a href="https://incolumitas.com/2021/01/10/browser-based-port-scanning/">Concept and code</a> I just added promises for integration in my main function

### Private mode (Incognito) detector

So I just google it and found several realization, this don't work with < Chrome 92, but works with others.

<a href="https://gist.github.com/jherax/a81c8c132d09cc354a0e2cb911841ff1">Almost full realization I found here</a>

If you are interested in story of incognito mode detection, you could read this <a href="https://fingerprintjs.com/blog/incognito-mode-detection/">article</a>. This article is not about how to do it now, but it's interesting.

### Browser detector

It's just from StackOwerflow <a href="https://stackoverflow.com/a/9851769">thread</a>), and it not works for actual chrome. 

## Check it with index.html

You could check how it works with your PC with index.html

![image_2021-09-28_21-40-45](https://user-images.githubusercontent.com/42908925/135504108-5f7c41bc-eefb-4103-a75c-9a19891d9e5f.png)

