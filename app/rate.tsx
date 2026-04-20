import { useLocalSearchParams, useRouter } from 'expo-router';
import { Star } from 'lucide-react-native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import GoBackButton from '../src/components/go-back/goback';
import { COLORS } from '../src/constants/colors';
import { LAWYERS, STAR_LABELS } from '../src/constants/data';
import { useRatingForm } from '../src/hooks/useRatingForm';
import { common } from '../src/styles/common';



export default function RateScreen() {
  const router = useRouter();
  const { lawyerId } = useLocalSearchParams<{ lawyerId: string }>();
  const lawyer =
    LAWYERS.find((l) => l.id === lawyerId) ?? LAWYERS[0];

  const {
    rating,
    setRating,
    setHoverRating,
    displayRating,
    comment,
    setComment,
    charsLeft,
    counterColor,
    isAnonymous,
    setIsAnonymous,
    isSubmitting,
    ratingError,
    handleSubmit,
    COMMENT_LIMIT,
  } = useRatingForm(() => {
    router.push({
      pathname: '/success',
      params: {
        lawyerName: lawyer.name,
        rating: String(rating),
        comment: comment.trim(),
        isAnonymous: String(isAnonymous),
      },
    });
  });

  return (
    <SafeAreaView style={common.container}>
      <View style={common.headerSimple}>
   <GoBackButton/>

        <Text style={common.screenTitle}>
          Avaliar advogado
        </Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={common.padding}
        keyboardShouldPersistTaps="handled"
      >
        {/* Lawyer */}
        <View style={[common.cardBase, styles.lawyerCard]}>
          <View
            style={[
              common.avatarMd,
              { backgroundColor: lawyer.avatarColor },
            ]}
          >
            <Text style={common.avatarInitialsMd}>
              {lawyer.initials}
            </Text>
          </View>

          <View style={styles.lawyerInfo}>
            <Text style={styles.lawyerName}>
              {lawyer.name}
            </Text>
            <Text style={styles.lawyerArea}>
              {lawyer.area}
            </Text>
            <Text style={common.dateText}>
              {lawyer.oab}
            </Text>
          </View>
        </View>

        {/* Stars */}
        <View style={styles.starsContainer}>
          <Text
            style={[
              common.txtCenteredBold,
              ratingError && styles.errorText,
            ]}
          >
            {ratingError
              ? 'Selecione uma nota para continuar'
              : 'Como você avalia o atendimento?'}
          </Text>

          <View style={common.starsRowLarge}>
            {[1, 2, 3, 4, 5].map((i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setRating(i)}
                onPressIn={() => setHoverRating(i)}
                onPressOut={() => setHoverRating(0)}
                activeOpacity={0.7}
              >
                <Star
                  color={
                    i <= displayRating
                      ? COLORS.star
                      : '#DDDDDD'
                  }
                  fill={
                    i <= displayRating
                      ? COLORS.star
                      : 'transparent'
                  }
                  size={44}
                />
              </TouchableOpacity>
            ))}
          </View>

          <Text
            style={[
              styles.ratingLabel,
              rating > 0 && styles.ratingLabelActive,
            ]}
          >
            {STAR_LABELS[rating] || ' '}
          </Text>
        </View>

        {/* Comment */}
        <View style={common.rowSpaced}>
          <Text style={styles.commentTitle}>
            Comentário{' '}
            <Text style={styles.commentOptional}>
              (opcional)
            </Text>
          </Text>

          <Text
            style={[
              common.dateText,
              { color: counterColor },
            ]}
          >
            {comment.length}/{COMMENT_LIMIT}
          </Text>
        </View>

        <TextInput
          multiline
          maxLength={COMMENT_LIMIT}
          style={common.commentInput}
          placeholder="Descreva sua experiência com este advogado..."
          placeholderTextColor="#AAA"
          value={comment}
          onChangeText={setComment}
          textAlignVertical="top"
        />

        {charsLeft <= 50 && (
          <Text
            style={[
              styles.charWarning,
              { color: counterColor },
            ]}
          >
            {charsLeft === 0
              ? 'Limite de caracteres atingido.'
              : `${charsLeft} caracteres restantes.`}
          </Text>
        )}

        {/* Anonymous */}
        <View style={common.cardAnonymous}>
          <View style={styles.anonymousText}>
            <Text style={styles.anonymousTitle}>
              Enviar anonimamente
            </Text>
            <Text style={common.dateText}>
              Seu nome não será exibido publicamente
            </Text>
          </View>

          <Switch
            value={isAnonymous}
            onValueChange={setIsAnonymous}
            trackColor={{
              false: '#DDDDDD',
              true: COLORS.teal,
            }}
            thumbColor={COLORS.white}
          />
        </View>

        <View style={styles.previewContainer}>
          <Text style={styles.previewText}>
            Sua avaliação aparecerá como:{' '}
            <Text style={styles.previewName}>
              {isAnonymous
                ? 'Usuário anônimo'
                : 'João Vitor'}
            </Text>
          </Text>
        </View>

        {/* Submit */}
        <TouchableOpacity
          style={[
            common.btnPrimary,
            styles.submitBtn,
            isSubmitting && styles.disabledBtn,
          ]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={common.txtWhite}>
            {isSubmitting
              ? 'Enviando...'
              : 'Enviar avaliação'}
          </Text>
        </TouchableOpacity>

        <View style={styles.footerSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerSpacer: {
    width: 24,
  },
  lawyerCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lawyerInfo: {
    marginLeft: 15,
    flex: 1,
  },
  lawyerName: {
    fontWeight: 'bold',
    color: COLORS.navy,
    fontSize: 16,
  },
  lawyerArea: {
    fontSize: 12,
    color: COLORS.teal,
    fontWeight: 'bold',
  },
  starsContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 8,
  },
  errorText: {
    color: '#E53935',
  },
  ratingLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'transparent',
    marginBottom: 10,
  },
  ratingLabelActive: {
    color: COLORS.star,
  },
  commentTitle: {
    fontWeight: 'bold',
    color: COLORS.navy,
  },
  commentOptional: {
    fontWeight: 'normal',
    color: COLORS.gray,
  },
  charWarning: {
    fontSize: 12,
    marginTop: 4,
  },
  anonymousText: {
    flex: 1,
  },
  anonymousTitle: {
    fontWeight: 'bold',
    color: COLORS.navy,
  },
  previewContainer: {
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 4,
  },
  previewText: {
    fontSize: 12,
    color: COLORS.gray,
  },
  previewName: {
    fontWeight: 'bold',
    color: COLORS.navy,
  },
  submitBtn: {
    marginTop: 20,
  },
  disabledBtn: {
    opacity: 0.7,
  },
  footerSpacing: {
    height: 40,
  },
});