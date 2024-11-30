export const CheckboxList = ({
  tipoBuqueOptions,
  selectedTipoBuques,
  onTipoBuqueChange,
}) => {
  return (
    <div>
      <h5>Tipo de Buque</h5>
      {tipoBuqueOptions.map((option) => (
        <div className="mb-2 form-check" key={option.id}>
          <input
            type="checkbox"
            className="form-check-input"
            id={option.id}
            name={option.id.toString()} // Usa el ID como nombre para identificarlo
            checked={selectedTipoBuques.includes(option.id)} // Verifica si el ID está en la lista de seleccionados
            onChange={onTipoBuqueChange}
          />
          <label className="form-check-label" htmlFor={option.id}>
            {option.name}
          </label>
        </div>
      ))}
    </div>
  );
};
