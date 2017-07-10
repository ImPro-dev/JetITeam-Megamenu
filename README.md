To install this module do next:

1. Edit your magento 2 composer.json file adding
to "repositories"
         {
             "type": "vcs",
             "url": ""
         }
and change "minimum-stability" to "dev" level.

2. Run
composer require jetiteam/module-megamenu

3. Run
php bin/magento module:enable JetITeam_Megamenu

4. Run
php bin/magento setup:upgrade

5. If not shown on frontend
Clear pub/static folder
rm -rf pub/static

6. Run
bin/magento setup:static-content:deploy