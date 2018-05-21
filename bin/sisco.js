#!/usr/bin/env node

const fs = require('fs');
const nodeSass = require('node-sass');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

const json = fs.readFileSync("sisco.json", "utf-8");
console.log(json);

const compile = () => {
    nodeSass.render({
        file: 'style.scss',
        outputStyle: 'expanded'
    }, (err, result) => {
        if (err) {
            console.error('error', err);
        } else {
            console.log('success', result);
            success(result);
        }
    });
};

const success = (result) => {
    const plugins = [];

    // if (options.autoprefixer) {
    //     plugins.push(autoprefixer({browsers: options.autoprefixerBrowsers, remove: options.autoprefixerRemoveOutdated}));
    // }

    postcss(plugins).process(result.css.toString(), {
        from: 'style.css',
        to: 'style.css'
    }).then(result => {
        fs.writeFile('style.css', result.css, (err) => {
            if (err) console.error(err);
        });

        if (result.map) {
            console.log(result.map);
        }
    })
};


module.exports = {
    compile: compile()
};
