import React from "react";
import { Deck, Slide, Heading, Text } from "spectacle";

const Slides = () => (
  <Deck>
    <Slide>
      <Heading>Welkom bij de presentatie!</Heading>
      <Text>Hier kun je een coole slide maken.</Text>
    </Slide>
    <Slide>
      <Heading>Slide 2</Heading>
      <Text>Een tweede slide met meer info.</Text>
    </Slide>
  </Deck>
);

export default Slides;
