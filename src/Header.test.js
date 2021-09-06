import { HeaderLink }from "./Header";
import { Link } from 'react-router-dom';
import React from "react";


test('Test HeaderLink', () => {
    const page = 'dell'
    expect(HeaderLink({ page })).toStrictEqual(<Link className ='text-header' to="/dell">Dell</Link>)
  });