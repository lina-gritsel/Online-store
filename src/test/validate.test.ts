import { copyLink } from "../pages/CatalogPage/CatalogCardList/useCopy";
import { validateValue } from "./validateValue";

test('Validate', () =>{
    expect(validateValue(50)).toBe(true)
})
test('FilterValues', () =>{
    expect(copyLink()).toBeDefined()
})