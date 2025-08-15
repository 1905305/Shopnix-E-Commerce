import React, { useState } from 'react';
import CheckboxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

const FilterPanel = ({ filters, selectedFilters, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div
      style={{
        fontFamily: 'Segoe UI, Roboto, sans-serif',
        padding: '20px',
        background: '#f9f9f9',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '280px',
        boxShadow: '0 0 8px rgba(0, 0, 0, 0.08)',
      }}
    >
      {filters.map((filter) => (
        <div key={filter.name} style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#333' }}>
            {filter.label}
          </h4>

          {filter.type === 'checkbox' &&
            filter.options.map((option) => {
              const checked = selectedFilters[filter.name]?.includes(option) || false;
              return (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px',
                    fontSize: '16px',
                    color: '#555',
                    gap: '8px',
                    cursor: 'pointer',
                  }}
                >
                  {checked ? (
                    <CheckboxIcon style={{ fontSize: 20, color: '#1976d2' }} />
                  ) : (
                    <CheckBoxOutlineBlankIcon style={{ fontSize: 20, color: '#aaa' }} />
                  )}
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onFilterChange(filter.name, option, e.target.checked)}
                    style={{ display: 'none' }}
                  />
                  <span>{option}</span>
                </label>
              );
            })}

          {filter.type === 'nestedCheckbox' && (
            <>
              {/* Dropdown to select category */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginBottom: '12px',
                  fontSize: '15px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                }}
              >
                <option value="">Select Category</option>
                {filter.options.map((group) => (
                  <option key={group.label} value={group.label}>
                    {group.label}
                  </option>
                ))}
              </select>

              {/* Render only the selected brand group */}
              {filter.options
                .filter((group) => group.label === selectedCategory)
                .map((group) => (
                  <div key={group.label} style={{ marginBottom: '12px' }}>
                    <div
                      style={{
                        fontWeight: '600',
                        fontSize: '16px',
                        marginBottom: '6px',
                        color: '#222',
                      }}
                    >
                      {group.label}
                    </div>
                    {group.subOptions.map((option) => {
                      const checked = selectedFilters[filter.name]?.includes(option) || false;
                      return (
                        <label
                          key={option}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '6px',
                            fontSize: '15px',
                            color: '#555',
                            paddingLeft: '12px',
                            cursor: 'pointer',
                          }}
                        >
                          {checked ? (
                            <CheckboxIcon style={{ fontSize: 18, color: '#1976d2' }} />
                          ) : (
                            <CheckBoxOutlineBlankIcon style={{ fontSize: 18, color: '#aaa' }} />
                          )}
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) =>
                              onFilterChange(filter.name, option, e.target.checked)
                            }
                            style={{ display: 'none' }}
                          />
                          <span>{option}</span>
                        </label>
                      );
                    })}
                  </div>
                ))}
            </>
          )}

          {filter.type === 'range' && (
            <div style={{ marginTop: '10px' }}>
              <input
                type="range"
                min={filter.min}
                max={filter.max}
                value={selectedFilters[filter.name] || filter.min}
                onChange={(e) =>
                  onFilterChange(filter.name, parseInt(e.target.value), true)
                }
                style={{ width: '100%' }}
              />
              <span style={{ fontSize: '14px', color: '#333' }}>
                {selectedFilters[filter.name] || filter.min}
              </span>
            </div>
          )}

          {filter.type === 'radio' &&
            filter.options.map((option) => {
              const checked = selectedFilters[filter.name] === option;
              return (
                <label
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px',
                    fontSize: '16px',
                    color: '#555',
                    gap: '8px',
                    cursor: 'pointer',
                  }}
                >
                  {checked ? (
                    <RadioButtonCheckedIcon style={{ fontSize: 20, color: '#1976d2' }} />
                  ) : (
                    <RadioButtonUncheckedIcon style={{ fontSize: 20, color: '#aaa' }} />
                  )}
                  <input
                    type="radio"
                    name={filter.name}
                    checked={checked}
                    onChange={() => onFilterChange(filter.name, option, true)}
                    style={{ display: 'none' }}
                  />
                  <span>{option}</span>
                </label>
              );
            })}

          {filter.type === 'toggle' && (
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
                fontSize: '16px',
                color: '#555',
                gap: '8px',
                cursor: 'pointer',
              }}
            >
              {selectedFilters[filter.name] ? (
                <ToggleOnIcon style={{ fontSize: 24, color: '#1976d2' }} />
              ) : (
                <ToggleOffIcon style={{ fontSize: 24, color: '#aaa' }} />
              )}
              <input
                type="checkbox"
                checked={selectedFilters[filter.name] || false}
                onChange={(e) => onFilterChange(filter.name, null, e.target.checked)}
                style={{ display: 'none' }}
              />
              <span>{filter.label}</span>
            </label>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterPanel;
