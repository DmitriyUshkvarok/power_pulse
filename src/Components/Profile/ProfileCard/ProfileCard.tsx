'use client';
import styles from './_ProfileCard.module.scss';
import Image from 'next/image';
import Notiflix from 'notiflix';
import useUserSession from '@/src/hooks/useUserSession';
import useCalculateDailyRecommendation from '@/src/hooks/useCalculateDailyCalories';
import { signOut } from 'next-auth/react';
import { resetUserData } from '@/src/redux/userData/userDataSlice';
import { useDispatch } from 'react-redux';
import { useState, useRef, FormEvent } from 'react';
import { revalidate } from '@/src/app/actions/uploadAvatarActions';
import { uploadPhoto } from '@/src/app/actions/uploadAvatarActions';
import { updateUser } from '@/src/app/actions/authActions';

const ProfileCard = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const dispatch = useDispatch();
  const { session, update } = useUserSession();
  const { calculateCalories } = useCalculateDailyRecommendation();

  const handleInputChange = async (
    e: React.ChangeEvent<HTMLInputElement & { files: FileList }>
  ) => {
    const selectedFile = e.target.files && e.target.files[0];

    if (
      selectedFile &&
      selectedFile.size < 6024 * 6024 &&
      selectedFile.type.startsWith('image/')
    ) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setPreview(null);
    }
  };

  const handleUpload = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!file) return alert('No valid image file selected.');

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const res = await uploadPhoto(formData);

      if (!res) {
        alert('Error uploading image');
        return;
      }

      if (typeof res === 'string') {
        await updateUser({ image: res });
        update({ image: res, name: session?.user?.name });
      } else if (res && res.erMsg) {
        alert(`Error: ${res.erMsg}`);
      } else {
        alert('Unexpected response format');
      }
      setFile(null);
      setPreview(null);

      formRef.current?.reset();

      revalidate('/');
    } catch (error) {
      console.log('Ошибка при отправке запроса:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleClickLogOut = () => {
    Notiflix.Confirm.show(
      'Confirmation',
      'Are you sure you want to log out?',
      'Yes',
      'No',
      async () => {
        try {
          dispatch(resetUserData());
          signOut({ callbackUrl: '/' });
        } catch (error) {
          console.error(error);
        }
      },
      () => {}
    );
  };

  return (
    <div className={styles.profile_container}>
      <form ref={formRef}>
        <label className={styles.user_photo_block} htmlFor="image">
          <input
            className={styles.updateUserInputImage}
            type="file"
            accept="image/*"
            id="image"
            name="image"
            onChange={handleInputChange}
            aria-label="image"
          />
          {preview ? (
            <Image
              className={styles.user_img}
              src={preview}
              alt={`user preview`}
              width={61}
              height={61}
            />
          ) : (
            <Image
              className={styles.user_img}
              src={session?.user?.image || '/icon_user.svg'}
              alt="user icon(photo)"
              width={61}
              height={61}
            />
          )}

          <div className={styles.add_photo_block} onClick={handleUpload}>
            {loading ? (
              <p style={{ color: 'white' }}>Loading...</p>
            ) : (
              <Image
                src={'/add_photo.svg'}
                alt="add photo icon"
                width={24}
                height={24}
              />
            )}
          </div>
        </label>
      </form>
      <h2 className={styles.user_name}>{session?.user?.name}</h2>
      <div className={styles.user_role}>User</div>
      <div className={styles.daily_block}>
        <div className={styles.daily_colories}>
          <div className={styles.daily_colories_top_block}>
            <Image
              src="/icon-daily.svg"
              alt="calories decor icon"
              width={20}
              height={20}
            />
            <div className={styles.daily_colories_top_text}>
              Daily calorie intake
            </div>
          </div>
          <div className={styles.daily_colories_counter}>
            {calculateCalories.recommendedCalories
              ? calculateCalories.recommendedCalories.toFixed()
              : 0}
          </div>
        </div>
        <div className={styles.daily_sport}>
          <div className={styles.daily_sport_top_block}>
            <Image
              src="/icon-sport.svg"
              alt="sport decor icon"
              width={20}
              height={20}
            />
            <div className={styles.daily_sport_top_text}>
              Daily norm of sports
            </div>
          </div>
          <div className={styles.daily_sport_counter}>
            {calculateCalories.recommendedSportTime.toFixed()} min
          </div>
        </div>
      </div>
      <div className={styles.warning_block}>
        <div className={styles.warning_icon_block}>
          <Image
            src="/warning-icon.svg"
            alt="warning icon"
            width={24}
            height={24}
          />
        </div>
        <p className={styles.warning_text}>
          We understand that each individual is unique, so the entire approach
          to diet is relative and tailored to your unique body and goals.
        </p>
      </div>

      <div
        className={styles.logout}
        onClick={(event: React.MouseEvent<HTMLDivElement>) =>
          handleClickLogOut()
        }
      >
        <Image src="/log-out.svg" alt="log out icon" width={20} height={20} />
        Logout
      </div>
    </div>
  );
};

export default ProfileCard;
