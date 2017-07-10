<?php

namespace JetITeam\Megamenu\Model\Attribute\Frontend;

use Magento\Eav\Model\Entity\Attribute\Frontend\AbstractFrontend;

class Products extends AbstractFrontend
{
    public function getInputRendererClass()
    {
        return 'JetITeam\Megamenu\Block\Data\Form\Element\Products';
    }
}