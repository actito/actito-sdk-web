[<img src="https://cdn-mobile.actito.com/logo.png"/>](https://actito.com)

# Actito Web SDK

[![GitHub release](https://img.shields.io/github/v/release/actito/actito-sdk-web)](https://github.com/actito/actito-sdk-web/releases)
[![License](https://img.shields.io/github/license/actito/actito-sdk-web)](https://github.com/actito/actito-sdk-web/blob/main/LICENSE)

The Actito Web SDK makes it quick and easy to communicate efficiently with many of the Actito API services and enables you to seamlessly integrate our various features, from Push Notifications to Contextualised Storage.

Get started with our [📚 integration guides](https://developers.actito.com/docs/push-implementation/web/implementation/) and [example projects](#examples).


Table of contents
=================

* [Features](#features)
* [Installation](#installation)
* [Getting Started](#getting-started)
* [Examples](#examples)


## Features

**Push notifications**: Receive push notifications and automatically track its engagement.

**Push notifications UI**: Use pre-built elements to display your push notifications and handle its actions with zero effort.

**In-app messaging**: Automatically show relevant in-app content to your users with zero effort.

**Inbox**: Apps with a built-in message inbox enjoy higher conversions due to its nature of keeping messages around that can be opened as many times as users want. The SDK gives you all the tools necessary to build your inbox UI.

**Geo**: Transform your user's location into relevant information, automate how you segment your users based on location behaviour and create truly contextual notifications.

**Assets**: Add powerful contextual marketing features to your apps. Show the right content to the right users at the right time or location. Maximise the content you're already creating without increasing development costs.


## Installation

We understand that not every app will take advantage of every bit of functionality provided by our platform. To help reduce your app's size and dependency footprint, now you are able to include just the modules your app needs.

Install the Actito library through NPM.

```shell
npm install actito-web
```

Import the necessary functions from each sub-package.

```javascript
import { } from 'actito-web/core';
import { } from 'actito-web/assets';
import { } from 'actito-web/geo';
import { } from 'actito-web/in-app-messaging';
import { } from 'actito-web/inbox';
import { } from 'actito-web/push';
import { } from 'actito-web/push-ui';
import { } from 'actito-web/user-inbox';
```


## Getting Started

### Integration
Get started with our [📚 integration guides](https://developers.actito.com/docs/push-implementation/web/implementation/) and [example projects](#examples).


### Examples
- The [Next.js example project](https://github.com/actito/actito-sdk-web/tree/main/apps/sample-next) demonstrates the integration in a simplified fashion, to quickly understand how a given feature should be implemented.
- The [CDN example project](https://github.com/actito/actito-sdk-web/tree/main/apps/sample-static) demonstrates how to include the Actito library through the CDN.
