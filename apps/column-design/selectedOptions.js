export default function SelectedOptions() {
  const selectedCheckboxes = document.querySelectorAll(
    ".checkbox-steel-sizes:checked"
  );
  const selectedValues = Array.from(selectedCheckboxes).map((checkbox) =>
    checkbox.getAttribute("data-value")
  );

  return selectedValues;
}
