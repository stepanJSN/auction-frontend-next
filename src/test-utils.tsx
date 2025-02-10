import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';


const customRender = (
  ui: ReactElement,
  {
    ...renderOptions
  }: Omit<RenderOptions, 'wrapper'> = {},
) => {
  const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
        </LocalizationProvider>
    );
  };
  return {
    ...render(ui, { wrapper: AllTheProviders, ...renderOptions }),
  };
};

export * from '@testing-library/react';

export { customRender as render };
