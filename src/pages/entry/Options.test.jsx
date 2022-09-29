import { render, screen } from "../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "./Options";

describe("Options", () => {
  test("Checking Scoops render elements", async () => {
    render(<Options optionType="scoops" />);
    const scoopsItemsList = await screen.findAllByRole("img", {
      name: /scoop$/i,
    });
    const scoopsAltTextList = scoopsItemsList.map((item) => item.alt);

    expect(scoopsItemsList).toHaveLength(2);
    expect(scoopsAltTextList).toEqual(["Chocolate scoop", "Vanilla scoop"]);
  });

  test("Checking Toppings render elements", async () => {
    render(<Options optionType="toppings" />);
    const toppingsItemsList = await screen.findAllByRole("img", {
      name: /topping$/i,
    });
    const toppingsAltTextList = toppingsItemsList.map((item) => item.alt);

    expect(toppingsItemsList).toHaveLength(3);
    expect(toppingsAltTextList).toEqual([
      "Cherries topping",
      "M&Ms topping",
      "Hot fudge topping",
    ]);
  });

  test("Scoops total is 0.00 by default", () => {
    render(<Options optionType="scoops" />);
    const scoopsTotal = screen.getByText(/Scoops total:/i);

    expect(scoopsTotal).toHaveTextContent("0.00");
  });

  test("Scoops total when chouse one scoop", async () => {
    render(<Options optionType="scoops" />);
    const scoopsTotal = screen.getByText(/Scoops total:/i);
    const chocolateScoopAmountInput = await screen.findByRole("spinbutton", {
      name: /Chocolate/i,
    });

    await userEvent.clear(chocolateScoopAmountInput);
    await userEvent.type(chocolateScoopAmountInput, "1");

    expect(scoopsTotal).toHaveTextContent("2.00");
  });

  test("Scoops total when chouse several scoops", async () => {
    render(<Options optionType="scoops" />);
    const scoopsTotal = screen.getByText(/Scoops total:/i);
    const chocolateScoopAmountInput = await screen.findByRole("spinbutton", {
      name: /Chocolate/i,
    });
    const vanillaScoopAmountInput = await screen.findByRole("spinbutton", {
      name: /Vanilla/i,
    });

    await userEvent.clear(chocolateScoopAmountInput);
    await userEvent.type(chocolateScoopAmountInput, "1");
    await userEvent.clear(vanillaScoopAmountInput);
    await userEvent.type(vanillaScoopAmountInput, "2");

    expect(scoopsTotal).toHaveTextContent("6.00");
  });

  test("Toppings total is 0.00 by default", () => {
    render(<Options optionType="toppings" />);
    const toppingsTotal = screen.getByText(/Toppings total:/i);

    expect(toppingsTotal).toHaveTextContent("0.00");
  });

  test("Toppings total when chouse one topping", async () => {
    render(<Options optionType="toppings" />);
    const toppingsTotal = screen.getByText(/Toppings total:/i);
    const cherriesToppingCheckbox = await screen.findByRole("checkbox", {
      name: /Cherries/i,
    });

    await userEvent.click(cherriesToppingCheckbox);

    expect(toppingsTotal).toHaveTextContent("1.50");
  });

  test("Toppings total when chouse several toppings", async () => {
    render(<Options optionType="toppings" />);
    const toppingsTotal = screen.getByText(/Toppings total:/i);
    const cherriesToppingCheckbox = await screen.findByRole("checkbox", {
      name: /Cherries/i,
    });
    const hotFudgeToppingCheckbox = await screen.findByRole("checkbox", {
      name: /Hot fudge/i,
    });

    await userEvent.click(cherriesToppingCheckbox);
    await userEvent.click(hotFudgeToppingCheckbox);

    expect(toppingsTotal).toHaveTextContent("3.00");
  });
});
