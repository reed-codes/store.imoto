import React, { useEffect, useLayoutEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import imagesLoaded from 'imagesloaded';

import Breadcrumb from '../../common/breadcrumb';
import SingleDetail from './common/details/single-detail';
import FeaturedProductsOne from './common/product-groups/featured-products-one';
import HorizontalThumbnail from './common/thumbnails/horizontal-thumbnail';
import SingleToggleTab from './common/tabs/single-toggle-tab';
import SidebarToggle from './common/sidebars/sidebar-toggle';
import ProductSidebarTwo from './common/sidebars/product-sidebar-two';

import { findProductById } from '../../../utils';

import {PricelistContext} from '../../../store/PricelistContext'

function SidebarLeftProduct( props ) {
    const { pricelistState } = useContext(PricelistContext);
    const products = pricelistState.pricelist ? pricelistState.pricelist : [];
    const productId  = props.match.params.id ? props.match.params.id : 1;
    let product = findProductById( products, productId );

    if ( !product ) {
        window.location = process.env.PUBLIC_URL + "/pages/404";
    }

    useLayoutEffect( () => {
        document.querySelector( '.skeleton-body' ) && document.querySelector( '.skeleton-body' ).classList.remove( 'loaded' );
    }, [ productId ] )

    useEffect( () => {
        let imgLoad = imagesLoaded( ".product-single-gallery" );

        imgLoad.on( "done", function () {
            document.querySelector( '.skeleton-body' ) && document.querySelector( '.skeleton-body' ).classList.add( 'loaded' );
        } )
    }, [ productId ] )

    return (
        <>
            <Helmet>
                <title>Porto React Ecommerce - Product Left Sidebar</title>
            </Helmet>

            <h1 className="d-none">Porto React Ecommerce - Product Page</h1>

            <div className="main">

                <Breadcrumb current="Sidebar" path="products" />

                <div className="container">
                    <div className="row">
                        <SidebarToggle />

                        <ProductSidebarTwo />

                        <div className="col-lg-9 product-page">
                            <div className="product-single-container product-single-default skeleton-body skel-shop-products">
                                <div className="row">
                                    <HorizontalThumbnail addClass="col-lg-7 col-md-6" product={ product } />

                                    <div className="col-lg-5 col-md-6">
                                        <SingleDetail product={ product } link="sidebar-left" />
                                    </div>
                                </div>
                            </div>

                            <SingleToggleTab product={ product } />

                            <FeaturedProductsOne addClass="pt-sm bg-white" isContainer={ false } link="sidebar-left" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SidebarLeftProduct;