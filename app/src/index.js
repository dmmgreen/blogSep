import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './configureStore';
import AppIndex from './containers/index';


let root=document.createElement('div');
root.setAttribute("id","app");
document.body.appendChild(root);
const store=configureStore();
render(
    <Provider store={store}>
        <AppIndex/>
    </Provider>,
    root
);
