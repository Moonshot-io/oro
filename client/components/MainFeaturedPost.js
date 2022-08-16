"use strict";
exports.__esModule = true;
var React = require("react");
var Paper_1 = require("@mui/material/Paper");
var Typography_1 = require("@mui/material/Typography");
var Grid_1 = require("@mui/material/Grid");
var Box_1 = require("@mui/material/Box");
function MainFeaturedPost(props) {
    var post = props.post;
    return (<Paper_1["default"] sx={{
            position: 'relative',
            backgroundColor: 'grey.800',
            color: '#fff',
            mb: 4,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: "url(".concat(post.image, ")")
        }}>
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={post.image}/>}
      <Box_1["default"] sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.3)'
        }}/>
      <Grid_1["default"] container>
        <Grid_1["default"] item md={6}>
          <Box_1["default"] sx={{
            position: 'relative',
            p: { xs: 3, md: 6 },
            pr: { md: 0 }
        }}>
            <Typography_1["default"] component='h1' variant='h3' color='inherit' gutterBottom>
              {post.title}
            </Typography_1["default"]>
            <Typography_1["default"] variant='h5' color='inherit' paragraph>
              {post.description}
            </Typography_1["default"]>
          </Box_1["default"]>
        </Grid_1["default"]>
      </Grid_1["default"]>
    </Paper_1["default"]>);
}
exports["default"] = MainFeaturedPost;
