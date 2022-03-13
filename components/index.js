/**
* This is central hub were we can export components 
* Now 'property-details/index.js' can utilize import in short way
* like import { Badge, Button, RowContainer } from '../../components';
*
* DRY method of coding
*/

export { default as Badge } from './badge.js';
export { default as Button } from './button.js';
export { default as RowContainer } from './rowContainer.js';