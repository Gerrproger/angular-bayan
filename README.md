# angular-bayan

[1]: <http://github.com/Gerrproger/angular-bayan>

__Easily customizable accordion-like module for Angular__  
_Shows the first line of the content in the collapsed state_

### Demo

[http://gerrproger.github.io/angular-bayan](http://gerrproger.github.io/angular-bayan)

### Browser support

Works on IE9+ in addition to other modern browsers such as Chrome, Firefox, and Safari

### Dependencies

Only Angular 1.2+

### Usage

Get angular-bayan.
- via npm: `npm install angular-bayan`
- or via Bower: `bower install angular-bayan`

Include it in your application.
```html
<script src="/angular-bayan/dist/angular-bayan.min.js"></script>
```

Add the module `angular-bayan` as a dependency to your app module.
```js
var myapp = angular.module('myapp', ['angularBayan']);
```

You can now start using the angular-bayan directives.
```html
<bayan>
  <bayan-header>Title</bayan-header>
  <bayan-content>
    <div>Element1</div>
    <div>Element2</div>
    <div>Element3</div>
    ...
  </bayan-content>
</bayan>
```

Directives can be referenced as element names or attributes. `bayan-header` should contain the header of an accordion. `bayan-content` should contain elements, it would be collapsed.
  
Directive `bayan-content` has two settings: `bayan-content-offset` and `bayan-content-collapsed`.  
Pass to `bayan-content-offset` number (in px) which would be added to the content height in the _collapsed_ state.  
By default Bayan is not collapsed but you can change it by setting `bayan-content-collapsed` to true.
```html
<bayan-content bayan-content-collapsed="true" bayan-content-offset="10">
  ...
</bayan-content>
```

By default Bayan looks for elements to collapse right inside `bayan-content` block.
And in the collapsed state hides all lines inside except the first one.
But you can manually specify the parent block in which your elements contained.
Just add to the parent block `bayan-content-target` attribute.
```html
<bayan-content>
  <ul bayan-content-target>
    <li>Element1</li>
    <li>Element2</li>
    <li>Element3</li>
    ...
  </ul>
</bayan-content>
```

Bayan sets his object in the `scope`. So you can use this to determinate collapsed state or recalculate the height of the content.
```html
<bayan>
  <bayan-header ng-bind="bayan.opened ? 'Collapse' : 'Expand'"></bayan-header>
  <bayan-content>
  ...
  </bayan-content>
  <button ng-click="bayan.update()">Update height</button>
</bayan>
```

To reinitialize the height of the Bayan content (if elements changed) you can just trigger `bayan:update` event. 
```js
$scope.$broadcast('bayan:update');
```

Bayan's _header_ and _content_ can be placed anywhere inside `bayan`.
For example `bayan-header` could be inside `bayan content`.

Bayan use `max-height` to control the height.
So you can easily add animation using `transitions`.

### License

Released under the terms of MIT License
