import { render, screen } from "../../../test-utils";
import userEvent from "@testing-library/user-event";
import Type from "../Type";

test("update product's total when products change", async () => {
	render(<Type orderType="products" />);

	const productsTotal = screen.getByText("상품 총 가격:", { exact: false });
	expect(productsTotal).toHaveTextContent("0");

	// 아메리카 여행 상품 1개 증가
	const americaInput = await screen.findByRole("spinbutton", {
		name: "America",
	});

	userEvent.clear(americaInput);
	userEvent.type(americaInput, "1");

	expect(productsTotal).toHaveTextContent("1000");
});

test("update option's total when options change", async () => {
	render(<Type orderType="options" />);

	const optionsTotal = screen.getByText("옵션 총 가격:", { exact: false });
	expect(optionsTotal).toHaveTextContent("0");

	// 보험 옵션 체크
	const insuranceCheckbox = await screen.findByRole("checkbox", {
		name: "Insurance",
	});
	userEvent.click(insuranceCheckbox);
	expect(optionsTotal).toHaveTextContent("500");

	// 디너 옵션 체크
	const dinnerCheckbox = await screen.findByRole("checkbox", {
		name: "Dinner",
	});
	userEvent.click(dinnerCheckbox);
	expect(optionsTotal).toHaveTextContent("1000");

	// 디너 옵션 체크 해제
	userEvent.click(dinnerCheckbox);
	expect(optionsTotal).toHaveTextContent("500");
});
