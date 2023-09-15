import { useNftItemByAddress } from '../../../query/hooks/useNftItemByAddress';
import { Icon, TouchableOpacity, View, useTheme } from '@tonkeeper/uikit';
import { NftItem } from '@tonkeeper/core/src/TonAPI';
import { memo, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { t } from '../../../i18n';

import { HideableImage } from '@tonkeeper/mobile/src/core/HideableAmount/HideableImage';
import { corners } from '@tonkeeper/uikit/src/styles/constants';
import { openNftModal } from '@tonkeeper/mobile/src/core/NFT/NFT';
import { HideableAmount } from '@tonkeeper/mobile/src/core/HideableAmount/HideableAmount';

interface DetailedNftItemProps {
  nftAddress?: string;
  nft?: NftItem;
}

export const DetailedNftItem = memo<DetailedNftItemProps>((props) => {
  const { data: nft } = useNftItemByAddress(props.nftAddress, { existingNft: props.nft });
  const theme = useTheme();

  const handleOpenNftItem = useCallback(() => {
    if (nft) {
      openNftModal(nft.address);
    }
  }, []);

  if (!nft) {
    return null;
  }

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={handleOpenNftItem} style={styles.nft}>
      {nft.image.small && (
        <HideableImage
          imageStyle={[styles.image, { backgroundColor: theme.backgroundContentTint }]}
          style={styles.imageContainer}
          uri={nft.image.small}
        />
      )}
      <View style={styles.nftNameContainer}>
        <HideableAmount stars="* * * *" numberOfLines={1} variant="h2">
          {nft.name || t('nft_transaction_head_placeholder')}
        </HideableAmount>
      </View>
      {!!nft.collection?.name && (
        <View style={styles.nftCollectionContainer}>
          <HideableAmount numberOfLines={1} color="foregroundSecondary" variant="body1">
            {nft.collection.name}
          </HideableAmount>
          {nft.approved_by.length > 0 && (
            <Icon
              style={{ marginLeft: 4 }}
              name="ic-verification-secondary-16"
              color="iconSecondary"
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  imageContainer: {
    zIndex: 2,
    height: 96,
    width: 96,
    marginBottom: 20,
    borderRadius: corners.large,
  },
  image: {
    borderRadius: corners.large,
  },
  nftNameContainer: {
    marginBottom: 2,
    alignItems: 'center',
  },
  nftCollectionContainer: {
    marginBottom: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nft: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
