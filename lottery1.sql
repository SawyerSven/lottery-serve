/*
 Navicat Premium Data Transfer

 Source Server         : 本地
 Source Server Type    : MySQL
 Source Server Version : 100138
 Source Host           : localhost:3306
 Source Schema         : lottery1

 Target Server Type    : MySQL
 Target Server Version : 100138
 File Encoding         : 65001

 Date: 16/05/2019 10:13:29
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for lottery
-- ----------------------------
DROP TABLE IF EXISTS `lottery`;
CREATE TABLE `lottery`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '彩票名称',
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '彩票图片',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `num` int(11) NULL DEFAULT NULL COMMENT '彩票数量',
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of lottery
-- ----------------------------
INSERT INTO `lottery` VALUES (4, '50元现金红包', '/public/upload/1557915635680198.png', '2019-05-15 18:20:35.685090', 32, '2019-05-15 18:20:35');
INSERT INTO `lottery` VALUES (6, '200元现金红包', '/public/upload/15579119427153101.png', '2019-05-15 17:20:12.970431', 48, '2019-05-15 14:17:56');
INSERT INTO `lottery` VALUES (7, '300元现金红包', '/public/upload/15579119427153101.png', '2019-05-15 17:20:12.576408', 31, '2019-05-15 14:17:56');
INSERT INTO `lottery` VALUES (8, '700元优惠券', '/public/upload/15579119427153101.png', '2019-05-15 17:20:12.191386', 10, '2019-05-15 14:17:56');
INSERT INTO `lottery` VALUES (19, '123123', '/public/upload/15579119427153101.png', '2019-05-15 17:19:02.000000', 123123, '2019-05-15 17:19:02');
INSERT INTO `lottery` VALUES (20, '123123', '/public/upload/15579129296286293.png', '2019-05-15 17:35:29.000000', 12312312, '2019-05-15 17:35:29');

SET FOREIGN_KEY_CHECKS = 1;
