export const FlexProp = { display: 'flex' };

export const justifyCenter = { 'justify-content': 'center' };
export const alignCenter = { 'align-items': 'center' };

export const CenterAllFlex = {
  ...FlexProp,
  ...justifyCenter,
  ...alignCenter,
};

export const CenterAllFlexNative = {
  ...justifyCenter,
  ...alignCenter,
};

export const AlignCenterFlex = {
  ...FlexProp,
  ...alignCenter,
};

export const JustifyCenterFlex = {
  ...FlexProp,
  ...justifyCenter,
};

export const JustifySpaceBetween = {
  ...FlexProp,
  'justify-content': 'space-between',
}

export const FlexColumn = {
  ...FlexProp,
  'flex-direction': 'column'
}

export const FlexRow = {
  ...FlexProp,
  'flex-wrap': 'wrap',
  'margin-right': '-15px',
  'margin-left': '-15px',
};

export const SetAllFlex = (d, a, j) => ({
  'flex-direction': d,
  'align-items': a,
  'justify-content': j,
});

export const SetAllFlexWithDisplay = (d, a, j) => ({
  ...FlexProp,
  ...SetAllFlex(d, a, j),
});
