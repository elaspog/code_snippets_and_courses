<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
// define( 'DB_NAME', 'database_name_here' );
define( 'DB_NAME', 'wordpress' );

/** MySQL database username */
// define( 'DB_USER', 'username_here' );
define( 'DB_USER', 'wordpressuser' );

/** MySQL database password */
// define( 'DB_PASSWORD', 'password_here' );
define( 'DB_PASSWORD', 'password' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

define( 'FS_METHOD', 'direct' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */

/*
define( 'AUTH_KEY',         'put your unique phrase here' );
define( 'SECURE_AUTH_KEY',  'put your unique phrase here' );
define( 'LOGGED_IN_KEY',    'put your unique phrase here' );
define( 'NONCE_KEY',        'put your unique phrase here' );
define( 'AUTH_SALT',        'put your unique phrase here' );
define( 'SECURE_AUTH_SALT', 'put your unique phrase here' );
define( 'LOGGED_IN_SALT',   'put your unique phrase here' );
define( 'NONCE_SALT',       'put your unique phrase here' );
*/

define('AUTH_KEY',         'cA8D{R^B,Y{[sIkxv&0`%G^4./Grzn-A[X/.[4[Li`t4bV]+@idAXvVcTD^1%]f8');
define('SECURE_AUTH_KEY',  '79bq5Gm7<L?9Llb%M%#+XY<r2p?@,x^#Sb-n3@&;G|Yu4t,_SN^9A^[9oR%Ez!p]');
define('LOGGED_IN_KEY',    'E!rC}]GtM0>,V Q4_V?Uzk%|)XF7b1YoZk8X);@50Rj|0+(F3pjWio-c9GHHXvF<');
define('NONCE_KEY',        'cMg{!:|++ha{w0-DSg,{S wKm(1Nbj434;DUZBn]U^cUvHBdtr-t&`K~7>b2-]@ ');
define('AUTH_SALT',        'x^[Y3L_m $}G)ENU-=W}1B-^%a)2KzW|XK(ZZ*|HR14:,=NQ&#<!dan-Sj%8*19B');
define('SECURE_AUTH_SALT', 'ZKm~=>y(b>$)MMkDj{@^#IJPMXexTn0t*wZO-7Y5zi|F=l(t/cW:%CaC-m*{@OmY');
define('LOGGED_IN_SALT',   '3+SV{o-&1ubxf0?_N=;-JUW, L>u+qc9~o_Uh_+`xlV8a(!Zq;/^]`eQJ]~[mO(x');
define('NONCE_SALT',       '`}3PP-tzlF#7YKq@v--=]- yIpmvC|kIn]LgEqF57!j |wgS@y4Mqn,gMM@sfNE6');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
