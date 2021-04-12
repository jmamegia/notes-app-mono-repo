import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Toggler from "./Toggler";

describe("<Toggler />", () => {
  let component;
  beforeEach(() => {
    component = render(
      <Toggler>
        <div>testDiv</div>
      </Toggler>
    );
  });

  test("render children", () => {
    component.getByText("testDiv");
    //expect(component.container.querySelector("testDiv")).toByDefined;
  });

  test("children starts hidden", () => {
    //const $el = component.container.querySelector("div");
    const $el = component.getByText("testDiv");
    expect($el.parentNode).toHaveStyle("display : none");
  });

  test("children visible after click", () => {
    const $button = component.container.querySelector("button");
    fireEvent.click($button);
    const $el = component.getByText("testDiv");
    expect($el.parentNode).not.toHaveStyle("display : none");
  });
});
