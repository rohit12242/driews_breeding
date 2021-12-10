import { withStyles } from '@mui/styles';

// ----------------------------------------------------------------------

const GlobalStyles = withStyles((theme) => ({
  '@global': {
    '*': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    },
    html: {
      width: '100%',
      height: '100%',
      '-ms-text-size-adjust': '100%',
      '-webkit-overflow-scrolling': 'touch'
    },
    body: {
      width: '100%',
      height: '100%',
      
      // transform: 'rotate(-180deg)'
      
    },
    '#root': {
      width: '100%',
      height: '100%',
      background: 'radial-gradient(92.09% 92.09% at 50%  7.91% , #27720D 0%, #BE3330 41.15%, #6242E6 67.19%, #000000 98.96%);',
      transform: 'rotate(-180deg)'
    },
    input: {
      '&[type=number]': {
        MozAppearance: 'textfield',
        '&::-webkit-outer-spin-button': { margin: 0, WebkitAppearance: 'none' },
        '&::-webkit-inner-spin-button': { margin: 0, WebkitAppearance: 'none' }
      }
    },
    textarea: {
      '&::-webkit-input-placeholder': { color: theme.palette.text.disabled },
      '&::-moz-placeholder': { opacity: 1, color: theme.palette.text.disabled },
      '&:-ms-input-placeholder': { color: theme.palette.text.disabled },
      '&::placeholder': { color: theme.palette.text.disabled }
    },
    a: { color: theme.palette.primary.main },
    img: { display: 'block', maxWidth: '100%' }
  }
}))(() => null);

export default GlobalStyles;
