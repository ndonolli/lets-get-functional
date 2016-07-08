#!/usr/bin/env node

'use strict';

const customers = require("./data/customers.json");
const lodown = require("./node_modules/lodown-ndonolli");

/**
 * 1. Import your lodown module using the require() method
 * 2. Solve all problems as outlined in the README.
 */
 
// number of males.
var maleCount = function(data) {
    let output = lodown.filter(data, function(elem, i) {
        return (elem["gender"] === "male");
    });
    return output.length;
};
console.log(maleCount(customers));

// number of females
var femaleCount = function(data) {
    let output = lodown.filter(data, function(elem, i) {
        return (elem["gender"] === "female");
    });
    return output.length;
};
console.log(femaleCount(customers));

// oldest customer, youngest customer
var oldestCustomer = lodown.most(customers, "age");
console.log(oldestCustomer.age);
var youngestCustomer = lodown.least(customers, "age");
console.log(youngestCustomer.age);

// average balance
var avgBalance = function(data) {
    let allBalances = lodown.allValues(customers, "balance");
    let convertedBalances = lodown.map(allBalances, function(e){
        return lodown.currencyToNum(e);
    });
    return lodown.average(convertedBalances).toFixed(2);
};
console.log(avgBalance(customers));

// how many customer’s names begin with some letter
var custStartWithLetter = function(data, letter) {
    let names = lodown.pluck(data, "name");
    return lodown.filter(names, function(name) {
        return name[0] === letter;
    });
};

console.log(custStartWithLetter(customers, 'A'));

// how many customer’s friend’s names begin with some letter

// how many customers are friends
var custAreFriends = function(data) {
    let areFriends = [];
    lodown.each(data, function(customer) {
        lodown.each(customer["friends"], function(friend) {
            let friendObj = lodown.returnObject(friend["name"], data);
            if (friendObj !== undefined) {
                lodown.each(friendObj["friends"], function(e) {
                    if (e["name"] === customer) {
                        areFriends.push([e["name"], customer.name]);
                    }
                })
            };
        });
    });
    return areFriends;
};
console.log(custAreFriends(customers));

// users have tags associated with them: find the top 3 most common tags

// create a summary of genders, the output should be: