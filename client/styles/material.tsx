import gradeIcon from '@mui/icons-material/Grade';
import luggageIcon from '@mui/icons-material/Luggage';
import travelExploreIcon from '@mui/icons-material/TravelExplore';
import homeIcon from '@mui/icons-material/Home';
import badge from '@mui/material/Badge';
import menuItem from '@mui/material/MenuItem';
import wbSunnyIcon from '@mui/icons-material/WbSunny';
import menuIcon from '@mui/icons-material/Menu';
import menu from '@mui/material/Menu';
import box from '@mui/material/Box';
import drawer from '@mui/material/Drawer';
import listItemAvatar from '@mui/material/ListItemAvatar';
import button from '@mui/material/Button';
import list from '@mui/material/List';
import divider from '@mui/material/Divider';
import listitem from '@mui/material/ListItem';
import listitembutton from '@mui/material/ListItemButton';
import listitemicon from '@mui/material/ListItemIcon';
import listitemtext from '@mui/material/ListItemText';
import tooltip from '@mui/material/Tooltip';
import inboxicon from '@mui/icons-material/MoveToInbox';
import mailicon from '@mui/icons-material/Mail';
import container from '@mui/material/Container';
import grid from '@mui/material/Grid';
import paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import card from '@mui/material/Card';
import cardHeader from '@mui/material/CardHeader';
import cardMedia from '@mui/material/CardMedia';
import cardContent from '@mui/material/CardContent';
import cardActions from '@mui/material/CardActions';
import collapse from '@mui/material/Collapse';
import iconButton from '@mui/material/IconButton';
import searchIcon from '@mui/icons-material/Search';
import typography from '@mui/material/Typography';
import favoriteIcon from '@mui/icons-material/Favorite';
import expandMoreIcon from '@mui/icons-material/ExpandMore';
import youTubeIcon from '@mui/icons-material/YouTube';
import twitterIcon from '@mui/icons-material/Twitter';
import musicNoteIcon from '@mui/icons-material/MusicNote';
import facebookIcon from '@mui/icons-material/Facebook';
import quizIcon from '@mui/icons-material/Quiz';
import instagramIcon from '@mui/icons-material/Instagram';
import languageIcon from '@mui/icons-material/Language';
import musicOffIcon from '@mui/icons-material/MusicOff';
import buttonBase from '@mui/material/ButtonBase';
import pushPinIcon from '@mui/icons-material/PushPin';
import localActivityIcon from '@mui/icons-material/LocalActivity';
import calendarMonthIcon from '@mui/icons-material/CalendarMonth';
import infoIcon from '@mui/icons-material/Info';
import descriptionIcon from '@mui/icons-material/Description';
import arrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import muiAccordion from '@mui/material/Accordion';
import accountCircleIcon from '@mui/icons-material/AccountCircle';
import muiAccordionSummary from '@mui/material/AccordionSummary';
import muiAccordionDetails from '@mui/material/AccordionDetails';
import outlinedInput from '@mui/material/OutlinedInput';
import fab from '@mui/material/Fab';
import imageList from '@mui/material/ImageList';
import imageListItem from '@mui/material/ImageListItem';
import avatar from '@mui/material/Avatar';
import { ThemeProvider } from 'styled-components';
import modal from '@mui/material/Modal';
import textField from '@mui/material/TextField';
import dialog from '@mui/material/Dialog';
import dialogActions from '@mui/material/DialogActions';
import dialogContent from '@mui/material/DialogContent';
import dialogContentText from '@mui/material/DialogContentText';
import dialogTitle from '@mui/material/DialogTitle';
import link from '@mui/material/Link';
import snackbar from '@mui/material/Snackbar';
import speedDial from '@mui/material/SpeedDial';
import closeRoundedIcon from '@mui/icons-material/CloseRounded';
import appBar from '@mui/material/AppBar';
import toolbar from '@mui/material/Toolbar';
import slide from '@mui/material/Slide';
import { useTheme } from '@mui/material/styles';
import arrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import nightlightIcon from '@mui/icons-material/Nightlight';
import priceChangeIcon from '@mui/icons-material/PriceChange';
import forumIcon from '@mui/icons-material/Forum';
import loginIcon from '@mui/icons-material/Login';
import arrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import emailIcon from '@mui/icons-material/Email';
import logoutIcon from '@mui/icons-material/Logout';
import Purple  from '@mui/material/colors/purple';
import inputLabel from '@mui/material/InputLabel';
import formControl from '@mui/material/FormControl';
import sortIcon from '@mui/icons-material/Sort';
import select, { SelectChangeEvent } from '@mui/material/Select';
import inputAdornment from '@mui/material/InputAdornment';
import attachMoneyIcon from '@mui/icons-material/AttachMoney';
import moreVertIcon from '@mui/icons-material/MoreVert';
import circularProgress from '@mui/material/CircularProgress';
import stack from '@mui/material/Stack';
import input from '@mui/material/Input';
import sendIcon from '@mui/icons-material/Send';
import clickAwayListener from '@mui/material/ClickAwayListener';

export const SendIcon = sendIcon;
export const Input = input;

export const Stack = stack;

export const CircularProgress = circularProgress;
export const AttachMoneyIcon = attachMoneyIcon;
export const InputAdornment = inputAdornment;
export const SortIcon = sortIcon;
export const Select = select;
export const FormControl = formControl;
export const InputLabel = inputLabel;
export const purple = Purple;
export const SearchIcon = searchIcon;
export const ListItemAvatar = listItemAvatar;
export const AccountCircleIcon = accountCircleIcon;
export const ArrowCircleUpIcon = arrowCircleUpIcon;
export const LogoutIcon = logoutIcon;
export const EmailIcon = emailIcon;
export const LoginIcon = loginIcon;
export const ForumIcon = forumIcon;

export const PriceChangeIcon = priceChangeIcon;
export const ArrowBackIosNewIcon = arrowBackIosNewIcon;
export const Styled = styled;
export const UseTheme = useTheme;
export const Item = Styled(paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
}));
export const TextField = textField;
export const CssTextField = Styled(TextField)({
  '& label.Mui-focused': {
    color: '#a352ff',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#a352ff',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#1A76D2',
    },
    '&:hover fieldset': {
      borderColor: '#BDBDBD',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#a352ff',
    },
  },
});
export	const	Button	=	button;
export const ColorButton = Styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#a352ff'),
  backgroundColor: '#a352ff',
  '&:hover': {
    backgroundColor: '#a352ff',
  },
}));

export const InvertedButton = Styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#03a9f4'),
  backgroundColor: '#03a9f4',
  '&:hover': {
    backgroundColor: '#03a9f4',
  },
}));

// export styled;
export const GradeIcon = gradeIcon;
export const LuggageIcon = luggageIcon;
export const TravelExploreIcon = travelExploreIcon;
export const HomeIcon = homeIcon;
export const Badge = badge;
export const WbSunnyIcon = wbSunnyIcon;
export const NightlightIcon = nightlightIcon;
export const MenuItem = menuItem;
export const MenuIcon = menuIcon;
export const Menu = menu;
export const SpeedDial = speedDial;
export	const	StyledProvider	=	ThemeProvider;
export const Modal = modal;
export const IconButton = iconButton;
export const OutlinedInput = outlinedInput;
export const Fab = fab;
export	const	Box	=	box;
export	const	Drawer	=	drawer;
export	const	List	=	list;
export	const	Divider	=	divider;
export	const	ListItem	=	listitem;
export	const	ListItemButton	=	listitembutton;
export	const	ListItemIcon	=	listitemicon;
export	const	ListItemText	=	listitemtext;
export	const	InboxIcon	=	inboxicon;
export	const	MailIcon	=	mailicon;
export	const	Container	=	container;
export	const	Grid	=	grid;
export	const	Paper	=	paper;
export	const	Card	=	card;
export	const	CardHeader	=	cardHeader;
export	const	CardMedia	=	cardMedia;
export	const	CardContent	=	cardContent;
export	const	CardActions	=	cardActions;
export	const	Collapse	=	collapse;
export	const	Typography	=	typography;
export	const	FavoriteIcon	=	favoriteIcon;
export	const	ExpandMoreIcon	=	expandMoreIcon;
export	const	YouTubeIcon	=	youTubeIcon;
export	const	TwitterIcon	=	twitterIcon;
export	const	MusicNoteIcon	=	musicNoteIcon;
export	const	FacebookIcon	=	facebookIcon;
export	const	QuizIcon	=	quizIcon;
export	const	InstagramIcon	=	instagramIcon;
export	const	LanguageIcon	=	languageIcon;
export const MusicOffIcon = musicOffIcon;
export const ButtonBase = buttonBase;
export const PushPinIcon = pushPinIcon;
export const LocalActivityIcon = localActivityIcon;
export const CalendarMonthIcon = calendarMonthIcon;
export const InfoIcon = infoIcon;
export const DescriptionIcon = descriptionIcon;
export const ArrowForwardIosSharpIcon = arrowForwardIosSharpIcon;
export const MuiAccordion = muiAccordion;
export const MuiAccordionSummary = muiAccordionSummary;
export const MuiAccordionDetails = muiAccordionDetails;
export const ImageList = imageList;
export const ImageListItem = imageListItem;
export const Dialog = dialog;
export const DialogActions = dialogActions;
export const DialogContent = dialogContent;
export const DialogContentText = dialogContentText;
export const DialogTitle = dialogTitle;
export const Link = link;
export const Snackbar = snackbar;
export const CloseRoundedIcon = closeRoundedIcon;
export const AppBar = appBar;
export const Toolbar = toolbar;
export const Slide = slide;
export const Avatar = avatar;
export const Tooltip = tooltip;
export const MoreVertIcon = moreVertIcon;
export const ClickAwayListener = clickAwayListener